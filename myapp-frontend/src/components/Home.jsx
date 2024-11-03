import React, { useState, useEffect } from "react";
import "./home.css";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const startRandomGame = () => {
    // Logic for starting a random game goes here if needed
    console.log("Random game started!");
  };

  return (
    <div className="home-container">
      <section className="intro">
        <h1 className="home-title">Play a Game to Earn Gold!</h1>
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
