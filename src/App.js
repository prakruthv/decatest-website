import React, { useState, useEffect } from "react";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Login from "./Login";
import Quiz from "./Quiz";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      {user ? (
        <>
          <button onClick={() => signOut(auth)}>Logout</button>
          <Quiz user={user} />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
