import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./click.css";

const Click = () => {
  // State for the game
  const [timeLeft, setTimeLeft] = useState(10);
  const [dots, setDots] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const navigate = useNavigate();

  // Function to generate a random neon color
  const getRandomNeonColor = () => {
    const neonColors = [
      "#FF00FF", // Magenta
      "#00FFFF", // Cyan
      "#FF0000", // Red
      "#00FF00", // Green
      "#FFFF00", // Yellow
      "#FF7F50", // Coral
      "#FF1493", // Deep Pink
      "#00BFFF", // Deep Sky Blue
      "#FF4500", // Orange Red
      "#32CD32", // Lime Green
    ];
    return neonColors[Math.floor(Math.random() * neonColors.length)];
  };

  // Generate dots when the component mounts
  useEffect(() => {
    const initialDots = Array.from({ length: 100 }, (_, index) => ({
      id: index,
      top: Math.random() * 90 + "vh", // Prevent overflow
      left: Math.random() * 90 + "vw", // Prevent overflow
      backgroundColor: getRandomNeonColor(), // Assign random neon color
    }));
    setDots(initialDots);
  }, []);

  // Countdown timer logic
  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleGameOver();
    }
  }, [timeLeft, gameOver]);

  // Handle game over logic
  const handleGameOver = () => {
    setGameOver(true);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      const updatedUser = {
        ...storedUser,
        gold: storedUser.gold + clickCount, // Update gold based on clicks
      };
      localStorage.setItem("user", JSON.stringify(updatedUser)); // Save updated user
    }
    // Navigate back to the home page after a delay
    setTimeout(() => {
      navigate("/");
    }, 3000); // 3-second delay
  };

  // Click handler for dots
  const handleDotClick = (id) => {
    setDots((prevDots) => prevDots.filter((dot) => dot.id !== id));
    setClickCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="game-container">
      <div
        style={{ position: "relative", height: "100vh", overflow: "hidden" }}
      >
        {gameOver ? (
          <h1>Game Over! You earned {clickCount} gold. Redirecting...</h1>
        ) : (
          <>
            <div className="dots-container">
              <h1>Time Left: {timeLeft} seconds</h1>
              <h2>Dots Clicked: {clickCount}</h2>
            </div>
            <div className="dots">
              {dots.map((dot) => (
                <div
                  key={dot.id}
                  onClick={() => handleDotClick(dot.id)}
                  style={{
                    position: "absolute",
                    top: dot.top,
                    left: dot.left,
                    width: "50px", // Size for the dots
                    height: "50px", // Size for the dots
                    backgroundColor: dot.backgroundColor, // Use random neon color
                    borderRadius: "50%", // Makes dots circular
                    cursor: "pointer",
                    boxShadow: "1px 1px 4px black",
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Click;
