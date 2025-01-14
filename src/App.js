import React, { useState } from "react";
import { auth, provider, signInWithPopup } from "./firebase";

function App() {
    const [user, setUser] = useState(null);

    const signIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            {user ? (
                <h1>Welcome, {user.displayName}!</h1>
            ) : (
                <button onClick={signIn}>Sign in with Google</button>
            )}
        </div>
    );
}

export default App;
