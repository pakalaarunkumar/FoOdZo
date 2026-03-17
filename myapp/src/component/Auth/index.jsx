import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Auth = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (!isLogin && !name) {
      alert("Please enter your name");
      return;
    }

    // Save login status
    localStorage.setItem("isLoggedIn", "true");

    // Save username
    localStorage.setItem("username", name || "User");

    // Notify Navbar
    window.dispatchEvent(new Event("loginStatusChanged"));

    // Redirect to home
    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? "Login" : "Create Account"}</h2>

        {!isLogin && (
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSubmit}>{isLogin ? "Login" : "Sign Up"}</button>

        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}

          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Sign Up" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
