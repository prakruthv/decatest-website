import React, { useState, useEffect } from "react";
import { auth } from "./firebase"; // Import Firebase authentication
import Login from "./Login";
import Quiz from "./Quiz";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check Firebase authentication state when the app loads
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return (
    <div className="App">
      {user ? <Quiz /> : <Login />}
    </div>
  );
}

export default App;
