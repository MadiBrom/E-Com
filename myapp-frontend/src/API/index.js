// index.js
const createNewUser = async (username, email, password) => {
  try {
    const response = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      throw new Error("Registration failed.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during registration:", error);
    return { error: error.message };
  }
};

export default createNewUser;

export const loginUser = async (email, password) => {
  try {
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      // Log the response for more insight into the error
      const errorText = await response.text();
      console.error("Response not OK:", errorText);
      throw new Error("Invalid login credentials");
    }

    const data = await response.json();
    console.log("Data received from login:", data); // Debugging log

    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    return { error: error.message }; // Return an error object instead of throwing
  }
};
