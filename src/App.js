import React, { useState } from 'react';
import questions from './questions';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
    }
  };

  return (
    <div className="container">
      <h1>DECA Practice Test</h1>
      {!showResults ? (
        <div className="quiz-container">
          <h2>{questions[currentQuestionIndex].question}</h2>
          <ul>
            {questions[currentQuestionIndex].choices.map((choice, index) => (
              <li key={index}>
                <button
                  onClick={() => handleAnswerSelection(choice)}
                  className={selectedAnswer === choice ? "selected" : ""}
                >
                  {choice}
                </button>
              </li>
            ))}
          </ul>
          <button onClick={handleNextQuestion} disabled={!selectedAnswer}>
            Next Question
          </button>
        </div>
      ) : (
        <div className="results-container">
          <h2>Quiz Completed!</h2>
          <p>Your Score: {score} / {questions.length}</p>
        </div>
      )}
    </div>
  );
}

export default App;
