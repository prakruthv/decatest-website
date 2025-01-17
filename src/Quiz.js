import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, logout, db, doc, setDoc, getDoc } from "./firebase";
import questions from "./questions";

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [tracker, setTracker] = useState({
    totalQuestions: 0,
    correctAnswers: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const loadProgress = async () => {
      const user = auth.currentUser;
      if (user) {
        const progressDoc = await getDoc(doc(db, "users", user.uid));
        if (progressDoc.exists()) {
          setTracker(progressDoc.data().progress);
        }
      }
    };
    loadProgress();
  }, []);

  useEffect(() => {
    const saveProgress = async () => {
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "users", user.uid), { progress: tracker });
      }
    };
    saveProgress();
  }, [tracker]);

  const handleAnswerSubmit = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const correct = selectedAnswer === currentQuestion.correctAnswer;

    setFeedback(
      correct
        ? "Correct!"
        : `Wrong! The correct answer is: ${currentQuestion.correctAnswer}`
    );
    setIsCorrect(correct);

    setTracker((prev) => ({
      totalQuestions: prev.totalQuestions + 1,
      correctAnswers: correct ? prev.correctAnswers + 1 : prev.correctAnswers,
    }));
  };

  const handleNextQuestion = () => {
    setFeedback("");
    setSelectedAnswer("");
    setIsCorrect(null);

    setCurrentQuestionIndex(
      Math.floor(Math.random() * questions.length)
    );
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <div className="header">
        <h1>DECA Practice Quiz</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <div className="question-box">
        <h2>{currentQuestion.question}</h2>
        <div className="choices">
          {currentQuestion.choices.map((choice, index) => (
            <label key={index} className="choice">
              <input
                type="radio"
                name="answer"
                value={choice}
                checked={selectedAnswer === choice}
                onChange={(e) => setSelectedAnswer(e.target.value)}
              />
              {choice}
            </label>
          ))}
        </div>
        <button
          onClick={handleAnswerSubmit}
          disabled={!selectedAnswer}
          className="submit-button"
        >
          Submit
        </button>
        {feedback && (
          <div className="feedback">
            <p>{feedback}</p>
            <button onClick={handleNextQuestion} className="next-button">
              Next Question
            </button>
          </div>
        )}
      </div>

      <div className="progress-box">
        <p>Total Questions Answered: {tracker.totalQuestions}</p>
        <p>Correct Answers: {tracker.correctAnswers}</p>
        <p>
          Accuracy: {tracker.totalQuestions > 0
            ? ((tracker.correctAnswers / tracker.totalQuestions) * 100).toFixed(2)
            : 0}%
        </p>
      </div>
    </div>
  );
};

export default Quiz;
