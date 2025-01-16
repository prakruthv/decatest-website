import React, { useState } from "react";
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

    const handleAnswerSubmit = () => {
        const currentQuestion = questions[currentQuestionIndex];
        const correct = selectedAnswer === currentQuestion.correctAnswer;

        setFeedback(
            correct
                ? "Correct!"
                : `Wrong! The correct answer is: ${currentQuestion.correctAnswer}`
        );
        setIsCorrect(correct);

        // Update tracker
        setTracker((prev) => ({
            totalQuestions: prev.totalQuestions + 1,
            correctAnswers: correct ? prev.correctAnswers + 1 : prev.correctAnswers,
        }));
    };

    const handleNextQuestion = () => {
        setFeedback("");
        setSelectedAnswer("");
        setIsCorrect(null);
        setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
    };

    const currentQuestion = questions[currentQuestionIndex];
    const accuracy =
        tracker.totalQuestions > 0
            ? ((tracker.correctAnswers / tracker.totalQuestions) * 100).toFixed(2)
            : 0;

    return (
        <div>
            <h1>Quiz</h1>
            <div className="question-container">
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
                <button onClick={handleAnswerSubmit} disabled={!selectedAnswer}>
                    Submit
                </button>
                {feedback && (
                    <div
                        className="feedback"
                        style={{
                            backgroundColor: isCorrect ? "#eaf7e1" : "#f8d7da",
                            color: isCorrect ? "#3c763d" : "#721c24",
                            borderColor: isCorrect ? "#cde4b8" : "#f5c6cb",
                        }}
                    >
                        <p>{feedback}</p>
                        <button onClick={handleNextQuestion}>Next Question</button>
                    </div>
                )}
            </div>
            <div className="tracker">
                <h3>Tracker</h3>
                <p>Total Questions Answered: {tracker.totalQuestions}</p>
                <p>Correct Answers: {tracker.correctAnswers}</p>
                <p>Accuracy: {accuracy}%</p>
            </div>
        </div>
    );
};

export default Quiz;
