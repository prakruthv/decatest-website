import React, { useEffect, useState } from "react";

const Progress = () => {
    const [tracker, setTracker] = useState({
        totalQuestions: 0,
        correctAnswers: 0,
    });

    useEffect(() => {
        const savedProgress = JSON.parse(localStorage.getItem("quizProgress"));
        if (savedProgress) {
            setTracker(savedProgress.tracker);
        }
    }, []);

    const accuracy =
        tracker.totalQuestions > 0
            ? ((tracker.correctAnswers / tracker.totalQuestions) * 100).toFixed(2)
            : 0;

    return (
        <div className="progress-container">
            <h1>Your Progress</h1>
            <p>Total Questions Answered: {tracker.totalQuestions}</p>
            <p>Correct Answers: {tracker.correctAnswers}</p>
            <p>Accuracy: {accuracy}%</p>
            <a href="/quiz">Back to Quiz</a>
        </div>
    );
};

export default Progress;
