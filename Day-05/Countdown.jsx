import React, { useState, useEffect } from "react";
import { FaClock, FaPlay, FaPause, FaRedoAlt } from "react-icons/fa";
import "./components.css";

/**
 * Part D Exercise 4: Countdown Component
 * 
 * Demonstrates:
 * - Timer initialization on mount using useEffect
 * - Timer cleanup on unmount using cleanup function
 * - State updates within useEffect
 * - Dependency array management
 */
const Countdown = () => {
  const [countdown, setCountdown] = useState(10);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    console.log("⏱️ Countdown Component Mounted - Starting timer");

    let intervalId;

    if (isActive && countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      console.log("⏰ Countdown finished!");
    }

    // Cleanup function - clears timer on unmount or when dependencies change
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        console.log("🧹 Cleanup: Timer cleared on unmount");
      }
    };
  }, [isActive, countdown]);

  const handleReset = () => {
    setCountdown(10);
    setIsActive(true);
    console.log("🔄 Countdown reset");
  };

  const handleToggle = () => {
    setIsActive(!isActive);
    console.log(`${!isActive ? "▶️ Resume" : "⏸️ Paused"} countdown`);
  };

  return (
    <div className="countdown-container">
      <div className="countdown-card">
        <div className="countdown-icon">
          <FaClock />
        </div>

        <h2>Countdown Timer</h2>
        <p className="countdown-display">{countdown}</p>

        {countdown === 0 && (
          <div className="countdown-finished">
            <p>✅ Time's Up!</p>
          </div>
        )}

        <div className="countdown-controls">
          <button
            className="control-btn pause-play-btn"
            onClick={handleToggle}
            disabled={countdown === 0}
          >
            {isActive ? (
              <>
                <FaPause /> Pause
              </>
            ) : (
              <>
                <FaPlay /> Resume
              </>
            )}
          </button>

          <button className="control-btn reset-btn" onClick={handleReset}>
            <FaRedoAlt /> Reset
          </button>
        </div>

        <p className="timer-info">
          Status: {isActive ? "⏳ Running" : "⏸️ Paused"}
        </p>
      </div>
    </div>
  );
};

export default Countdown;
