import React, { useState, useEffect } from "react";
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

    useEffect(() => {
        // Load progress from local storage
        const savedProgress = JSON.parse(localStorage.getItem("quizProgress"));
        if (savedProgress) {
            setTracker(savedProgress.tracker);
            setCurrentQuestionIndex(savedProgress.currentQuestionIndex);
        }
    }, []);

    useEffect(() => {
        // Save progress to local storage whenever tracker changes
        localStorage.setItem(
            "quizProgress",
            JSON.stringify({ tracker, currentQuestionIndex })
        );
    }, [tracker, currentQuestionIndex]);

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

        // Randomize next question order
        setCurrentQuestionIndex(
            (prevIndex) => Math.floor(Math.random() * questions.length)
        );
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="quiz-container">
            <h1>DECA Practice Quiz</h1>
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
            <div className="navigation">
                <a href="/progress">View Progress</a>
            </div>
        </div>
    );
};

export default Quiz;
