import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Prize = () => {
  const [gold, setGold] = useState(0);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    // Generate a random amount of gold between 1 and 100
    const randomGold = Math.floor(Math.random() * 100) + 1;
    setGold(randomGold);

    // Redirect to home page after 3 seconds
    const timer = setTimeout(() => {
      navigate("/"); // Replace with your home route path
    }, 3000);

    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Congratulations!</h1>
      <p>
        You have been awarded <strong>{gold}</strong> gold!
      </p>
      <p>Redirecting you back to the home page...</p>
    </div>
  );
};

export default Prize;
