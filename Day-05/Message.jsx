import React, { useEffect } from "react";
import { FaMountain } from "react-icons/fa";
import "./components.css";

/**
 * Part B: Component Lifecycle with Functional Components
 * Message Component with useEffect
 * 
 * Demonstrates:
 * - useEffect hook for lifecycle events
 * - Mounting behavior (console log on mount)
 * - Unmounting/Cleanup behavior (cleanup function)
 * - Empty dependency array [] for mount/unmount only
 */
const Message = () => {
  useEffect(() => {
    console.log("✅ Message Component Mounted");

    // Cleanup function runs on unmount
    return () => {
      console.log("❌ Message Component Unmounted");
    };
  }, []); // Empty dependency array - runs once on mount

  return (
    <div className="message-container">
      <div className="message-card">
        <div className="message-icon">
          <FaMountain />
        </div>
        <h2>Hello! I am a message.</h2>
        <p>This component demonstrates lifecycle hooks in React.</p>
        <p className="lifecycle-info">
          Check the browser console to see mount/unmount logs!
        </p>
      </div>
    </div>
  );
};

export default Message;
