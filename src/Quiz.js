import React, { useState } from "react";
import { auth } from "./firebase";
import questions from "./questions"; // Assuming your questions are stored in questions.js

function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (choice) => {
    setSelectedAnswer(choice);
  };

  const handleSubmit = () => {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    setShowResult(false);
    setSelectedAnswer(null);
    setCurrentQuestionIndex((prev) => (prev + 1) % questions.length);
  };

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div>
      <h2>Quiz</h2>
      <button onClick={handleLogout}>Logout</button>

      <div>
        <p>{questions[currentQuestionIndex].question}</p>
        {questions[currentQuestionIndex].choices.map((choice, index) => (
          <div key={index}>
            <input
              type="radio"
              name="answer"
              value={choice}
              onChange={() => handleAnswerSelect(choice)}
              checked={selectedAnswer === choice}
            />
            {choice}
          </div>
        ))}
      </div>

      {!showResult ? (
        <button onClick={handleSubmit} disabled={!selectedAnswer}>
          Submit
        </button>
      ) : (
        <div>
          <p>
            {selectedAnswer === questions[currentQuestionIndex].correctAnswer
              ? "Correct!"
              : "Incorrect!"}
          </p>
          <p>Correct Answer: {questions[currentQuestionIndex].correctAnswer}</p>
          <button onClick={handleNextQuestion}>Next Question</button>
        </div>
      )}

      <p>Score: {score}</p>
    </div>
  );
}

export default Quiz;
