require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Ensure jwt is required

const app = express();
const port = 3000;

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Test route to verify server status
app.get("/test", (req, res) => {
  res.send("Server is up and running!");
});

// Registration route
app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(400).json({ message: "Error registering user." });
  }
});

// Login route with detailed logging for debugging
app.post("/api/login", async (req, res) => {
  console.log("Login request received with body:", req.body);
  const { email, password } = req.body;

  try {
    // Step 1: Check if the request body is correctly parsed
    if (!email || !password) {
      console.log("Email or password missing in request.");
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    // Step 2: Find user by email in the database
    const user = await prisma.user.findUnique({
      where: { email },
    });
    console.log("User found:", user);

    if (!user) {
      console.log("User not found with the provided email.");
      return res.status(404).json({ message: "User not found." });
    }

    // Step 3: Check if the password matches
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isPasswordMatch);

    if (!isPasswordMatch) {
      console.log("Incorrect password provided.");
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Step 4: Generate JWT token if credentials are correct
    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("JWT token generated:", token);

    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Error in login route:", error);
    res.status(500).json({ message: "Login error." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
