import React, { useState, useEffect } from "react";
import { FaBullhorn, FaToggleOn, FaToggleOff } from "react-icons/fa";
import "./components.css";

/**
 * Part D Exercise 3: Conditional Rendering with Props
 * 
 * Demonstrates:
 * - Passing messages as props to child components
 * - Conditional rendering based on toggle state
 * - Component lifecycle with multiple props
 */

const MessageDisplay = ({ message, messageId }) => {
  useEffect(() => {
    console.log(`📢 Message ${messageId} displayed: "${message}"`);

    return () => {
      console.log(`🔇 Message ${messageId} hidden`);
    };
  }, [messageId, message]);

  return (
    <div className="prop-message-display">
      <div className="message-content">
        <FaBullhorn className="message-icon" />
        <p>{message}</p>
      </div>
    </div>
  );
};

const PropMessage = () => {
  const [visibleMessages, setVisibleMessages] = useState({
    msg1: true,
    msg2: true,
    msg3: true,
  });

  const messagesData = [
    {
      id: "msg1",
      text: "Props are a way to pass data from parent to child components.",
    },
    {
      id: "msg2",
      text: "Conditional rendering allows components to display content selectively.",
    },
    {
      id: "msg3",
      text: "Combining both enables powerful, dynamic UI interactions.",
    },
  ];

  const toggleMessage = (messageId) => {
    setVisibleMessages((prev) => ({
      ...prev,
      [messageId]: !prev[messageId],
    }));
  };

  return (
    <div className="prop-message-container">
      <div className="prop-message-card">
        <h2>Props + Conditional Rendering</h2>
        <p className="section-description">
          Messages passed as props, displayed conditionally
        </p>

        <div className="messages-grid">
          {messagesData.map((msg) => (
            <div key={msg.id} className="message-toggle-wrapper">
              <button
                className={`toggle-prop-btn ${
                  visibleMessages[msg.id] ? "on" : "off"
                }`}
                onClick={() => toggleMessage(msg.id)}
              >
                {visibleMessages[msg.id] ? (
                  <>
                    <FaToggleOn /> Hide
                  </>
                ) : (
                  <>
                    <FaToggleOff /> Show
                  </>
                )}
              </button>

              {visibleMessages[msg.id] && (
                <MessageDisplay message={msg.text} messageId={msg.id} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropMessage;
