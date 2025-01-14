import React, { useState } from 'react';
import Quiz from './Quiz';

function App() {
    const [startQuiz, setStartQuiz] = useState(false);

    return (
        <div className="app">
            {!startQuiz ? (
                <div className="welcome-section">
                    <h1>Welcome to the DECA Practice Test</h1>
                    <button onClick={() => setStartQuiz(true)}>Start Quiz</button>
                </div>
            ) : (
                <Quiz />
            )}
        </div>
    );
}

export default App;
