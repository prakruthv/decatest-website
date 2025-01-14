import React, { useState, useEffect } from 'react';
import questionsData from './questions';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [showNext, setShowNext] = useState(false);

  // Shuffle questions on mount
  useEffect(() => {
    setQuestions(shuffleArray([...questionsData]));
  }, []);

  // Shuffle function to randomize questions
  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  // Handle answer selection and submission
  const handleSubmit = (choice) => {
    const currentQuestion = questions[currentIndex];
    const isCorrect = choice === currentQuestion.correctAnswer;

    // Provide immediate feedback
    setFeedback(isCorrect ? "✅ Correct!" : `❌ Incorrect. The correct answer is: ${currentQuestion.correctAnswer}`);

    // Track answered questions
    setAnsweredQuestions([...answeredQuestions, currentQuestion]);

    // Show "Next Question" button
    setShowNext(true);
  };

  // Move to next question
  const handleNextQuestion = () => {
    setFeedback('');
    setShowNext(false);

    if (answeredQuestions.length + 1 >= questions.length) {
      // If all questions are answered, recycle them
      setAnsweredQuestions([]);
      setQuestions(shuffleArray([...questionsData]));
      setCurrentIndex(0);
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div className="quiz-container">
      {questions.length > 0 && (
        <>
          <h2>{questions[currentIndex].question}</h2>
          <div className="choices">
            {questions[currentIndex].choices.map((choice, index) => (
              <div key={index} className="choice-item">
                <button 
                  className="choice-btn"
                  onClick={() => handleSubmit(choice)}
                  disabled={showNext} // Disable after answer submission
                >
                  {choice}
                </button>
              </div>
            ))}
          </div>
          {feedback && <p className="feedback">{feedback}</p>}
          {showNext && <button className="next-btn" onClick={handleNextQuestion}>Next Question</button>}
        </>
      )}
    </div>
  );
}

export default App;
