import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaTrash } from "react-icons/fa";
import "./components.css";

/**
 * Part D Exercise 1: ToggleMessage Component
 * 
 * Demonstrates:
 * - Showing/hiding multiple messages with separate buttons
 * - Console logs for mount and unmount in each message
 * - State management for multiple independent messages
 */

const MessageItem = ({ id, text, onRemove }) => {
  useEffect(() => {
    console.log(`📨 Message ${id} mounted: "${text}"`);

    return () => {
      console.log(`🗑️ Message ${id} unmounted`);
    };
  }, [id, text]);

  return (
    <div className="message-item">
      <p>{text}</p>
      <button className="delete-btn" onClick={() => onRemove(id)}>
        <FaTrash /> Remove
      </button>
    </div>
  );
};

const ToggleMessage = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "React is awesome! 🚀", visible: true },
    { id: 2, text: "Conditional rendering is powerful! ⚡", visible: true },
    { id: 3, text: "Hooks make React functional! 🎣", visible: true },
  ]);

  const toggleMessage = (id) => {
    setMessages(
      messages.map((msg) =>
        msg.id === id ? { ...msg, visible: !msg.visible } : msg
      )
    );
  };

  const removeMessage = (id) => {
    setMessages(messages.filter((msg) => msg.id !== id));
  };

  return (
    <div className="toggle-message-container">
      <div className="toggle-message-card">
        <h2>Multiple Messages Toggle</h2>
        <p className="section-description">
          Click toggle buttons to show/hide messages or remove them
        </p>

        <div className="messages-list">
          {messages.map((msg) => (
            <div key={msg.id} className="message-wrapper">
              <button
                className={`toggle-btn ${msg.visible ? "visible" : "hidden"}`}
                onClick={() => toggleMessage(msg.id)}
              >
                {msg.visible ? (
                  <>
                    <FaEye /> Hide
                  </>
                ) : (
                  <>
                    <FaEyeSlash /> Show
                  </>
                )}
              </button>

              {msg.visible && (
                <MessageItem id={msg.id} text={msg.text} onRemove={removeMessage} />
              )}
            </div>
          ))}
        </div>

        {messages.length === 0 && (
          <p className="no-messages">No messages to display. All removed!</p>
        )}
      </div>
    </div>
  );
};

export default ToggleMessage;
