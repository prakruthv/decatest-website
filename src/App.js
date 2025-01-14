import React, { useState, useEffect } from 'react';
import questionsData from './questions';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  // Shuffle questions on mount
  useEffect(() => {
    setQuestions(shuffleArray([...questionsData]));
  }, []);

  // Shuffle function to randomize questions
  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  // Handle answer selection
  const handleAnswerClick = (choice) => {
    setSelectedAnswer(choice);
  };

  // Handle submission
  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const currentQuestion = questions[currentIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    // Provide immediate feedback (Correct or Incorrect)
    setFeedback(isCorrect ? "✅ Correct!" : `❌ Incorrect. The correct answer is: ${currentQuestion.correctAnswer}`);

    // Track answered questions
    setAnsweredQuestions([...answeredQuestions, currentQuestion]);

    // Delay before moving to the next question
    setTimeout(() => {
      setSelectedAnswer(null);
      setFeedback('');

      if (answeredQuestions.length + 1 >= questions.length) {
        // If all questions are answered, recycle them
        setAnsweredQuestions([]);
        setQuestions(shuffleArray([...questionsData]));
        setCurrentIndex(0);
      } else {
        setCurrentIndex(prevIndex => prevIndex + 1);
      }
    }, 2000); // 2-second delay to show feedback
  };

  return (
    <div className="quiz-container">
      {questions.length > 0 && (
        <>
          <h2>{questions[currentIndex].question}</h2>
          <div className="choices">
            {questions[currentIndex].choices.map((choice, index) => (
              <button 
                key={index} 
                className={selectedAnswer === choice ? 'selected' : ''}
                onClick={() => handleAnswerClick(choice)}
              >
                {choice}
              </button>
            ))}
          </div>
          <button className="submit-btn" onClick={handleSubmit} disabled={selectedAnswer === null}>
            Submit
          </button>
          {feedback && <p className="feedback">{feedback}</p>}
        </>
      )}
    </div>
  );
}

export default App;
