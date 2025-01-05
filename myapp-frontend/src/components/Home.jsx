import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUser = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser({ ...storedUser, gold: storedUser.gold || 0 }); // Default gold to 0
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const updateGold = (amount) => {
    if (user) {
      const updatedUser = { ...user, gold: (user.gold || 0) + amount };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  const startRandomGame = () => {
    const games = ["/riddles", "/prize", "/click"];
    const randomGame = games[Math.floor(Math.random() * games.length)];
    navigate(randomGame);
  };

  return (
    <div className="home-container">
      <section className="intro">
        <h1 className="home-title">Play to Earn Gold!</h1>
        <h2 className="home-gold">
        {user?.gold != null ? user.gold.toFixed(0) : "0"} 🪙
        </h2>
        <div className="start-screen">
          <button
            className="home-game"
            onClick={user ? startRandomGame : fetchUser}
            disabled={!user}
          >
            Start Random Game
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
