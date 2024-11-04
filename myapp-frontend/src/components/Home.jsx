import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Function to fetch user data from localStorage
  const fetchUser = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser); // Update user state
  };

  // Initial fetch of user data
  useEffect(() => {
    fetchUser();
  }, []);

  // Update user state and localStorage when needed
  const updateGold = (amount) => {
    if (user) {
      const updatedUser = { ...user, gold: user.gold + amount };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser); // Update local state
    }
  };

  const startRandomGame = () => {
    const games = ["/riddles", "/prize", "/click"]; // Array of game routes
    const randomGame = games[Math.floor(Math.random() * games.length)]; // Randomly select a game
    navigate(randomGame);
    console.log("Random game started!");
  };

  return (
    <div className="home-container">
      <section className="intro">
        <h1 className="home-title">Play to Earn Gold!</h1>
        <h2 className="home-gold">{user ? user.gold.toFixed(0) : "0"} 🪙</h2>

        <div className="start-screen">
          <button className="home-game" onClick={startRandomGame}>
            Start Random Game
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
