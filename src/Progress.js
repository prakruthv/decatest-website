import React, { useEffect, useState } from "react";
import { auth, db, doc, getDoc } from "./firebase";

const Progress = () => {
  const [tracker, setTracker] = useState({
    totalQuestions: 0,
    correctAnswers: 0,
  });

  useEffect(() => {
    const fetchProgress = async () => {
      const user = auth.currentUser;
      if (user) {
        const progressDoc = await getDoc(doc(db, "users", user.uid));
        if (progressDoc.exists()) {
          setTracker(progressDoc.data().progress);
        }
      }
    };

    fetchProgress();
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
