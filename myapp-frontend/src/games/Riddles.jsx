import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Riddles = () => {
  const navigate = useNavigate();

  const riddles = [
    {
      question: "What has keys but can't open locks?",
      answers: ["A map", "A piano", "A computer", "A car"],
      correct: "A piano",
    },
    {
      question: "What has to be broken before you can use it?",
      answers: ["An egg", "A lock", "A window", "A vase"],
      correct: "An egg",
    },
    {
      question:
        "I’m tall when I’m young, and I’m short when I’m old. What am I?",
      answers: ["A candle", "A shadow", "A mountain", "A building"],
      correct: "A candle",
    },
    {
      question: "What has one head, one foot, and four legs?",
      answers: ["A bed", "A spider", "A man", "A dog"],
      correct: "A bed",
    },
    {
      question:
        "What comes once in a minute, twice in a moment, but never in a thousand years?",
      answers: ["The letter 'M'", "A blink", "A thought", "An hour"],
      correct: "The letter 'M'",
    },
    {
      question:
        "I’m light as a feather, yet the strongest man can’t hold me for much more than a minute. What am I?",
      answers: ["A breath", "A thought", "An emotion", "A shadow"],
      correct: "A breath",
    },
    {
      question: "The more of this there is, the less you see. What is it?",
      answers: ["Darkness", "Smoke", "Fog", "Time"],
      correct: "Darkness",
    },
    {
      question: "What has many needles but doesn’t sew?",
      answers: ["A cactus", "A porcupine", "A pine tree", "A sewing kit"],
      correct: "A pine tree",
    },
    {
      question: "What has a neck but no head?",
      answers: ["A bottle", "A guitar", "A shirt", "A tree"],
      correct: "A bottle",
    },
    {
      question: "Where does today come before yesterday?",
      answers: [
        "In a dictionary",
        "In a calendar",
        "In a timeline",
        "In history",
      ],
      correct: "In a dictionary",
    },
  ];

  const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0);
  const [feedback, setFeedback] = useState("");

  // useEffect to set a random riddle index on component mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * riddles.length);
    setCurrentRiddleIndex(randomIndex);
  }, []);

  const handleAnswerClick = (answer) => {
    const isCorrect = answer === riddles[currentRiddleIndex].correct;
    setFeedback(isCorrect ? "Correct!" : "Try again!");

    // Award gold and navigate back to home page if the answer is correct
    if (isCorrect) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const updatedUser = { ...storedUser, gold: storedUser.gold + 10 };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  const { question, answers } = riddles[currentRiddleIndex];

  return (
    <div>
      <h1>Choose Correctly</h1>
      <h2>Earn Gold</h2>
      <p>{question}</p>
      <div className="answers">
        {answers.map((answer, index) => (
          <button key={index} onClick={() => handleAnswerClick(answer)}>
            {answer}
          </button>
        ))}
      </div>
      {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default Riddles;
