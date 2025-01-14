import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Quiz from "./Quiz";
import Login from "./Login";
import "./styles.css";
import { auth } from "./firebase"; // Import Firebase authentication

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
