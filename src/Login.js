import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { emailSignIn, googleSignIn } from "./firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      await emailSignIn(email, password);
      navigate("/quiz");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMessage("");
    try {
      await googleSignIn();
      navigate("/quiz");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleEmailLogin}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <p>Don’t have an account? <a href="/signup">Sign up here</a>.</p>
    </div>
  );
};

export default Login;
