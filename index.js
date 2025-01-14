import React, { useState } from "react";
import ReactDOM from "react-dom";
import { auth, provider, signInWithPopup } from "./firebase";

function App() {
    const [user, setUser] = useState(null);

    const signIn = async () => {
        const result = await signInWithPopup(auth, provider);
        setUser(result.user);
    };

    return (
        <div>
            {user ? (
                <h1>Welcome, {user.displayName}!</h1>
            ) : (
                <button onClick={signIn}>Sign in with Google</button>
            )}
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
