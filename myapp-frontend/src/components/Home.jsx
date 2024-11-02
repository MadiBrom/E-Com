import React, { useState, useEffect } from "react";

const Home = () => {
  const [lastGameResult, setLastGameResult] = useState("");
  const [user, setUser] = useState(null);
  const [clickCount, setClickCount] = useState(0); // Counts clicks for Clicker Game
  const [timer, setTimer] = useState(10); // 10-second timer for Clicker Game
  const [gameActive, setGameActive] = useState(false); // Track if a game is active
  const [selectedGame, setSelectedGame] = useState(null); // Stores the selected game type
  const [riddle, setRiddle] = useState(null); // Store current riddle for Riddle Game
  const [selectedAnswer, setSelectedAnswer] = useState(""); // Track selected answer

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  // Riddles list
  const riddles = [
    {
      question: "What has keys but can't open locks?",
      options: ["A piano", "A map", "A book", "A lock"],
      answer: "A piano",
    },
    {
      question:
        "What comes once in a minute, twice in a moment, but never in a thousand years?",
      options: ["The letter M", "The sun", "A second", "The moon"],
      answer: "The letter M",
    },
    {
      question: "What has a neck but no head?",
      options: ["A bottle", "A snake", "A river", "A shadow"],
      answer: "A bottle",
    },
    {
      question:
        "I’m tall when I’m young, and I’m short when I’m old. What am I?",
      options: ["A candle", "A person", "A tree", "A building"],
      answer: "A candle",
    },
    {
      question: "What has a face and two hands but no arms or legs?",
      options: ["A clock", "A painting", "A table", "A mirror"],
      answer: "A clock",
    },
    {
      question: "What has to be broken before you can use it?",
      options: ["An egg", "A lock", "A window", "A nut"],
      answer: "An egg",
    },
    {
      question: "What goes up but never comes down?",
      options: ["Your age", "A balloon", "The sun", "A ladder"],
      answer: "Your age",
    },
  ];

  // Start a random game
  const startRandomGame = () => {
    const gameType = Math.random() > 0.5 ? "clicker" : "riddle"; // Randomly select game
    setSelectedGame(gameType);
    setGameActive(true);

    if (gameType === "clicker") {
      startClickerGame();
    } else {
      startRiddleGame();
    }
  };

  // Start the Clicker Game
  const startClickerGame = () => {
    setClickCount(0);
    setTimer(10);
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          finishClickerGame();
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Handle click event for earning gold in Clicker Game
  const handleButtonClick = () => {
    if (gameActive && selectedGame === "clicker") {
      setClickCount(clickCount + 1);
    }
  };

  const finishClickerGame = () => {
    const earnedGold = clickCount; // Gold based on clicks
    updateGold(earnedGold); // Update user's gold balance

    // Log and display the game result
    const resultMessage = `You clicked ${clickCount} times and earned ${earnedGold} gold!`;
    setLastGameResult(resultMessage); // Set the result message for display

    console.log(resultMessage); // Console log
    setGameActive(false);
    setSelectedGame(null); // Reset game
  };

  // Start the Riddle Game
  const startRiddleGame = () => {
    const selectedRiddle = riddles[Math.floor(Math.random() * riddles.length)];
    setRiddle({
      ...selectedRiddle,
      options: shuffleArray([...selectedRiddle.options]), // Shuffle the options
    });
    setSelectedAnswer(""); // Reset selected answer
  };

  // Function to shuffle an array
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Handle Riddle Answer Submission
  const submitRiddleAnswer = () => {
    if (selectedAnswer === riddle.answer) {
      updateGold(10); // Award 10 gold for correct answer
      alert("Correct! You've earned 10 🪙.");
    } else {
      alert("Wrong answer! Try again next time.");
    }
    setGameActive(false);
    setSelectedGame(null); // Reset game
  };

  // Update gold in user data and localStorage
  const updateGold = (amount) => {
    if (user) {
      const updatedGold = (parseFloat(user.gold) + amount).toFixed(0);
      const updatedUser = { ...user, gold: parseInt(updatedGold) };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  return (
    <div className="home-container">
      <h1>Play a Game to Earn Gold!</h1>
      <h2>{user ? user.gold.toFixed(0) : "0"} 🪙</h2>

      <div>
        <button onClick={startRandomGame} disabled={gameActive}>
          {gameActive ? "Game in Progress..." : "Start Random Game"}
        </button>
      </div>

      {gameActive && selectedGame === "clicker" && (
        <div className="clicker-game">
          <h3>Click as fast as you can! Time left: {timer}s</h3>
          <button onClick={handleButtonClick}>Click Me!</button>
          <p>Clicks: {clickCount}</p>
        </div>
      )}

      {gameActive && selectedGame === "riddle" && riddle && (
        <div className="riddle-game">
          <h3>{riddle.question}</h3>
          {riddle.options.map((option, index) => (
            <label key={index}>
              <input
                type="radio"
                name="riddle"
                value={option}
                checked={selectedAnswer === option}
                onChange={() => setSelectedAnswer(option)}
              />
              {option}
            </label>
          ))}
          <button onClick={submitRiddleAnswer}>Submit Answer</button>
        </div>
      )}
    </div>
  );
};

export default Home;
