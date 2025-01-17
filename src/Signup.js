import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { emailSignUp, googleSignIn } from "./firebase";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      await emailSignUp(email, password);
      navigate("/quiz");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    setErrorMessage("");
    try {
      await googleSignIn();
      navigate("/quiz");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleEmailSignup}>
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
        <button type="submit">Sign Up</button>
      </form>
      <button onClick={handleGoogleSignup}>Sign up with Google</button>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <p>Already have an account? <a href="/">Login here</a>.</p>
    </div>
  );
};

export default Signup;
