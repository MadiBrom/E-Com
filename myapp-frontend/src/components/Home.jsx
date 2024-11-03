import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Change this line
import "./home.css";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Use useNavigate instead of Navigate

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const startRandomGame = () => {
    navigate("/riddles"); // Now this will correctly navigate to "/riddles"
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
