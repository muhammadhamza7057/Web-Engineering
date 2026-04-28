import React, { useState } from "react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import "./components.css";

/**
 * Part A: Conditional Rendering Exercise
 * Login/Logout Message Component
 * 
 * Demonstrates:
 * - useState hook for managing login state
 * - Ternary operator for conditional rendering
 * - Dynamic button text based on state
 */
const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleToggle = () => {
    setIsLoggedIn(!isLoggedIn);
    console.log(`User ${!isLoggedIn ? "logged in" : "logged out"}`);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-icon">
          {isLoggedIn ? "👤" : "🔐"}
        </div>

        {isLoggedIn ? (
          <h2 className="welcome-message">Welcome, User! 👋</h2>
        ) : (
          <h2 className="login-message">Please Log In 🔓</h2>
        )}

        <button
          className={`login-btn ${isLoggedIn ? "logout-btn" : "login-btn"}`}
          onClick={handleToggle}
        >
          {isLoggedIn ? (
            <>
              <FaSignOutAlt /> Logout
            </>
          ) : (
            <>
              <FaSignInAlt /> Login
            </>
          )}
        </button>

        <p className="status-text">
          Status: <span className={isLoggedIn ? "logged-in" : "logged-out"}>
            {isLoggedIn ? "Logged In ✓" : "Logged Out ✗"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
