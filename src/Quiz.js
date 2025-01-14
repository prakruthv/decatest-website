import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import questions from "./questions";

function Quiz({ user }) {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (user) {
      loadUserProgress();
    }
  }, [user]);

  const loadUserProgress = async () => {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      setAnsweredQuestions(docSnap.data().answeredQuestions || []);
    } else {
      await setDoc(userRef, { answeredQuestions: [] });
    }
    getNextQuestion();
  };

  const getNextQuestion = () => {
    const remainingQuestions = questions.filter(q => !answeredQuestions.includes(q.question));
    if (remainingQuestions.length === 0) {
      setAnsweredQuestions([]);
      getNextQuestion();
    } else {
      const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
      setCurrentQuestion(remainingQuestions[randomIndex]);
      setSelectedAnswer(null);
      setFeedback("");
    }
  };

  const handleSubmit = async () => {
    if (!selectedAnswer) return;
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    setFeedback(isCorrect ? "Correct!" : `Wrong! The correct answer is: ${currentQuestion.correctAnswer}`);

    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, { answeredQuestions: [...answeredQuestions, currentQuestion.question] }, { merge: true });
  };

  return (
    <div>
      {currentQuestion && (
        <>
          <h2>{currentQuestion.question}</h2>
          {currentQuestion.choices.map((choice) => (
            <div key={choice}>
              <input
                type="radio"
                name="answer"
                value={choice}
                onChange={() => setSelectedAnswer(choice)}
                checked={selectedAnswer === choice}
              />
              {choice}
            </div>
          ))}
          <button onClick={handleSubmit} disabled={!selectedAnswer}>Submit</button>
          <p>{feedback}</p>
          {feedback && <button onClick={getNextQuestion}>Next Question</button>}
        </>
      )}
    </div>
  );
}

export default Quiz;
