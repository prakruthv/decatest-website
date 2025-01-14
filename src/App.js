import React, { useState, useEffect } from 'react';
import questionsData from './questions';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [showNext, setShowNext] = useState(false);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [activeTab, setActiveTab] = useState('quiz'); // Controls tab switching

  // Shuffle questions on mount
  useEffect(() => {
    setQuestions(shuffleArray([...questionsData]));
  }, []);

  // Shuffle function to randomize questions
  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  // Handle answer selection
  const handleAnswerSelect = (choice) => {
    setSelectedAnswer(choice);
  };

  // Handle answer submission
  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const currentQuestion = questions[currentIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    // Provide immediate feedback
    setFeedback(isCorrect ? "✅ Correct!" : `❌ Incorrect. The correct answer is: ${currentQuestion.correctAnswer}`);

    // Update progress
    setTotalAnswered(totalAnswered + 1);
    if (isCorrect) setTotalCorrect(totalCorrect + 1);

    // Track answered questions
    setAnsweredQuestions([...answeredQuestions, currentQuestion]);

    // Show "Next Question" button
    setShowNext(true);
  };

  // Move to next question
  const handleNextQuestion = () => {
    setFeedback('');
    setShowNext(false);
    setSelectedAnswer(null);

    if (answeredQuestions.length + 1 >= questions.length) {
      // If all questions are answered, reset tracking and reshuffle
      setAnsweredQuestions([]);
      setQuestions(shuffleArray([...questionsData]));
      setCurrentIndex(0);
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div className="quiz-container">
      <h2>DECA Practice Test</h2>

      {/* Tab Navigation */}
      <div className="tab-container">
        <button className={activeTab === 'quiz' ? 'active-tab' : ''} onClick={() => setActiveTab('quiz')}>Quiz</button>
        <button className={activeTab === 'stats' ? 'active-tab' : ''} onClick={() => setActiveTab('stats')}>User Stats</button>
      </div>

      {/* Quiz Tab */}
      {activeTab === 'quiz' && (
        <>
          {questions.length > 0 && (
            <>
              <h3>{questions[currentIndex].question}</h3>
              <div className="choices">
                {questions[currentIndex].choices.map((choice, index) => (
                  <label key={index} className="choice-item">
                    <input
                      type="radio"
                      name="answer"
                      value={choice}
                      checked={selectedAnswer === choice}
                      onChange={() => handleAnswerSelect(choice)}
                      disabled={showNext}
                    />
                    {choice}
                  </label>
                ))}
              </div>
              <button className="submit-btn" onClick={handleSubmit} disabled={showNext || selectedAnswer === null}>
                Submit
              </button>
              {feedback && <p className="feedback">{feedback}</p>}
              {showNext && <button className="next-btn" onClick={handleNextQuestion}>Next Question</button>}
            </>
          )}
        </>
      )}

      {/* Stats Tab */}
      {activeTab === 'stats' && (
        <div className="stats">
          <h3>User Statistics</h3>
          <p>Questions Answered: {totalAnswered}</p>
          <p>Correct Answers: {totalCorrect}</p>
          <p>Accuracy: {totalAnswered > 0 ? ((totalCorrect / totalAnswered) * 100).toFixed(1) + "%" : "N/A"}</p>
        </div>
      )}
    </div>
  );
}

export default App;
