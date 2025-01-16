import React, { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setMessage(`Logged in as: ${userCredential.user.email}`);
        } catch (error) {
            setMessage(`Login failed: ${error.message}`);
        }
    };

    const handleSignUp = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setMessage(`User created: ${userCredential.user.email}`);
        } catch (error) {
            setMessage(`Sign-up failed: ${error.message}`);
        }
    };

    return (
        <div>
            <h1>Login or Sign Up</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleSignUp}>Sign Up</button>
            <p>{message}</p> {/* Display feedback messages */}
        </div>
    );
};

export default Login;
