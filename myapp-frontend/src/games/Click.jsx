import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming React Router is used

// This would come from context or a higher-level state in your actual app
let goldBank = 0;

const Click = () => {
  // Timer countdown state
  const [timeLeft, setTimeLeft] = useState(10);
  const [dots, setDots] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const navigate = useNavigate();

  // Generate dots only once when the component mounts
  useEffect(() => {
    const initialDots = Array.from({ length: 100 }, (_, index) => ({
      id: index,
      top: Math.random() * 100 + "vh",
      left: Math.random() * 100 + "vw",
    }));
    setDots(initialDots);
  }, []);

  // Start countdown timer
  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setGameOver(true);
      // Update the gold bank with the number of dots clicked
      goldBank += clickCount;

      // Set a timeout to navigate back to the home page
      setTimeout(() => {
        navigate("/"); // Redirect to home page
      }, 3000); // 3-second delay before redirect
    }
  }, [timeLeft, gameOver, clickCount, navigate]);

  // Click handler to remove dot and increase score
  const handleDotClick = (id) => {
    setDots((prevDots) => prevDots.filter((dot) => dot.id !== id));
    setClickCount((prevCount) => prevCount + 1);
  };

  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      {gameOver ? (
        <h1>Game Over! You earned {clickCount} gold. Redirecting...</h1>
      ) : (
        <>
          <h1>Time Left: {timeLeft} seconds</h1>
          <h2>Dots clicked: {clickCount}</h2>
          {dots.map((dot) => (
            <div
              key={dot.id}
              onClick={() => handleDotClick(dot.id)}
              style={{
                position: "absolute",
                top: dot.top,
                left: dot.left,
                width: "25px",
                height: "25px",
                borderRadius: "50%",
                backgroundColor: "blue",
                cursor: "pointer",
              }}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Click;
