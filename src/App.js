import React, { useState } from "react";
import questions from "./questions";

function App() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);

    const question = questions[currentQuestionIndex];

    const handleAnswerClick = (index) => {
        setSelectedAnswer(index);
        setShowExplanation(true);
    };

    const handleNextQuestion = () => {
        setSelectedAnswer(null);
        setShowExplanation(false);
        setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>DECA Practice Test</h1>
            <h2>{question.question}</h2>
            {question.options.map((option, index) => (
                <button 
                    key={index} 
                    onClick={() => handleAnswerClick(index)}
                    style={{
                        display: "block",
                        margin: "10px auto",
                        padding: "10px",
                        fontSize: "16px"
                    }}
                >
                    {option}
                </button>
            ))}
            {showExplanation && (
                <div>
                    <p>
                        <strong>Correct Answer:</strong> {question.options[question.correctAnswer]}
                    </p>
                    <p>{question.explanation}</p>
                    <button onClick={handleNextQuestion}>Next Question</button>
                </div>
            )}
        </div>
    );
}

export default App;
