const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();
const port = 3000;

// Serve static files
app.use(express.static("public"));

// Route to get all users, their inventory, and transactions as JSON
app.get("/users", async (req, res) => {
  try {
    // Fetch users, their inventory (with products), and transactions
    const users = await prisma.user.findMany({
      include: {
        inventory: {
          include: {
            product: true, // Include the related product for each inventory item
          },
        },
        transactions: true, // Include the user's transactions
      },
    });

    res.json(users); // Send the complete user data with inventory and transactions
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
