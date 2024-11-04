import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./riddle.css";

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
    {
      question: "What has to be taken before you can have it?",
      answers: ["A photograph", "A nap", "A step", "A ticket"],
      correct: "A photo",
    },
    {
      question:
        "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?",
      answers: ["An echo", "A cloud", "A shadow", "A dream"],
      correct: "An echo",
    },
    {
      question: "What can travel around the world while staying in a corner?",
      answers: ["A stamp", "A cloud", "A letter", "A coin"],
      correct: "A stamp",
    },
    {
      question: "What begins with T, ends with T, and has T in it?",
      answers: ["A teapot", "A tent", "A toaster", "A ticket"],
      correct: "A teapot",
    },
    {
      question: "I have branches, but no fruit, trunk, or leaves. What am I?",
      answers: ["A bank", "A river", "A library", "A road"],
      correct: "A bank",
    },
    {
      question: "What is full of holes but still holds water?",
      answers: ["A sponge", "A bucket", "A net", "A colander"],
      correct: "A sponge",
    },
    {
      question: "What has one eye but cannot see?",
      answers: ["A needle", "A hurricane", "A storm", "A potato"],
      correct: "A needle",
    },
    {
      question: "What gets wetter as it dries?",
      answers: ["A towel", "A sponge", "A river", "A raindrop"],
      correct: "A towel",
    },
    {
      question: "What has a thumb and four fingers but is not alive?",
      answers: ["A glove", "A robot", "A hand", "A statue"],
      correct: "A glove",
    },
    {
      question: "What is always in front of you but can’t be seen?",
      answers: ["The future", "Air", "Your shadow", "A dream"],
      correct: "The future",
    },
    {
      question: "What is so fragile that saying its name breaks it?",
      answers: ["Silence", "A promise", "A secret", "Trust"],
      correct: "Silence",
    },
    {
      question:
        "What begins with an E, ends with an E, but only contains one letter?",
      answers: ["An envelope", "An eye", "An experience", "An engine"],
      correct: "An envelope",
    },
    {
      question: "What can you catch but not throw?",
      answers: ["A cold", "A fish", "A ball", "A glimpse"],
      correct: "A cold",
    },
    {
      question: "What has teeth but cannot bite?",
      answers: ["A comb", "A saw", "A zipper", "A lock"],
      correct: "A comb",
    },
    {
      question: "What is easy to get into, but hard to get out of?",
      answers: ["Trouble", "A relationship", "Debt", "A car"],
      correct: "Trouble",
    },
    {
      question:
        "What begins with P, ends with E, and has thousands of letters?",
      answers: ["Post office", "Page", "Pineapple", "Parade"],
      correct: "Post office",
    },
    {
      question: "What can you hold in your left hand but not in your right?",
      answers: ["Your right hand", "A pencil", "A book", "A coin"],
      correct: "Your right hand",
    },
    {
      question: "What has legs but doesn't walk?",
      answers: ["A table", "A chair", "A spider", "A person"],
      correct: "A table",
    },
    {
      question:
        "What is light as a feather, yet the strongest person can't hold it for long?",
      answers: ["Breath", "A whisper", "A thought", "A shadow"],
      correct: "Breath",
    },
    {
      question: "What has an eye but cannot see?",
      answers: ["A needle", "A storm", "A potato", "A camera"],
      correct: "A needle",
    },
  ];

  const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [feedback, setFeedback] = useState("");

  // Function to shuffle answers
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    // Select a random riddle on component mount
    const randomIndex = Math.floor(Math.random() * riddles.length);
    setCurrentRiddleIndex(randomIndex);
  }, []);

  useEffect(() => {
    // Shuffle answers whenever the riddle index changes
    setShuffledAnswers(shuffleArray([...riddles[currentRiddleIndex].answers]));
  }, [currentRiddleIndex]);

  const handleAnswerClick = (answer) => {
    const isCorrect = answer === riddles[currentRiddleIndex].correct;

    setFeedback(isCorrect ? "Correct!" : "Incorrect!");

    setTimeout(() => {
      if (isCorrect) {
        // Award gold and navigate back to home page if the answer is correct
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const updatedUser = { ...storedUser, gold: storedUser.gold + 10 };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
      // Navigate back to home page regardless of whether the answer was correct or not
      navigate("/");
    }, 1500); // Delay navigation by 1.5 seconds
  };

  const { question } = riddles[currentRiddleIndex];

  return (
    <div>
      <h1 className="riddle-title">Choose Correctly</h1>
      <p className="riddle">{question}</p>
      <div className="riddle-answers">
        {shuffledAnswers.map((answer, index) => (
          <button
            className="answer"
            key={index}
            onClick={() => handleAnswerClick(answer)}
          >
            {answer}
          </button>
        ))}
      </div>
      {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default Riddles;
