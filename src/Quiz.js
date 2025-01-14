import React, { useState } from 'react';
import questions from './questions';

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    const handleAnswerClick = (choice) => {
        setSelectedAnswer(choice);
    };

    const handleNextQuestion = () => {
        if (selectedAnswer === questions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }

        setSelectedAnswer(null);

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowScore(true);
        }
    };

    return (
        <div className="quiz-container">
            {showScore ? (
                <div className="score-section">
                    <h2>Your Score: {score} / {questions.length}</h2>
                </div>
            ) : (
                <div className="question-section">
                    <h2>Question {currentQuestion + 1} / {questions.length}</h2>
                    <p>{questions[currentQuestion].question}</p>
                    <div className="answer-section">
                        {questions[currentQuestion].choices.map((choice, index) => (
                            <button
                                key={index}
                                className={`answer-button ${selectedAnswer === choice ? 'selected' : ''}`}
                                onClick={() => handleAnswerClick(choice)}
                            >
                                {choice}
                            </button>
                        ))}
                    </div>
                    <button className="next-button" onClick={handleNextQuestion} disabled={!selectedAnswer}>
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Quiz;
