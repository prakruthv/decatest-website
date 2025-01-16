import React, { useState } from "react";
import questions from "./questions";

const Quiz = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [feedback, setFeedback] = useState("");

    const handleAnswerSubmit = () => {
        const currentQuestion = questions[currentQuestionIndex];
        if (selectedAnswer === currentQuestion.correctAnswer) {
            setFeedback("Correct!");
        } else {
            setFeedback(`Wrong! The correct answer is: ${currentQuestion.correctAnswer}`);
        }
    };

    const handleNextQuestion = () => {
        setFeedback("");
        setSelectedAnswer("");
        setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
    };

    const currentQuestion = questions[currentQuestionIndex];

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
                    <div className="feedback">
                        <p>{feedback}</p>
                        <button onClick={handleNextQuestion}>Next Question</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Quiz;
