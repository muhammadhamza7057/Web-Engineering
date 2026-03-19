import React, { useState } from "react";
import { FaHome, FaChevronDown, FaChevronUp } from "react-icons/fa";
import Login from "./Login";
import Message from "./Message";
import ToggleMessage from "./ToggleMessage";
import Countdown from "./Countdown";
import PropMessage from "./PropMessage";
import "./App.css";

/**
 * Lab #7: React Conditional Rendering and Component Lifecycle
 * 
 * Main Application Component
 * 
 * This application demonstrates:
 * - Part A: Conditional Rendering (Login component)
 * - Part B: Component Lifecycle (Message component with useEffect)
 * - Part D: Advanced Exercises (ToggleMessage, Countdown, PropMessage)
 */

const App = () => {
  const [showMessage, setShowMessage] = useState(true);
  const [expandedSection, setExpandedSection] = useState("part-a");

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>
            <FaHome /> Lab #7: React Conditional Rendering & Lifecycle
          </h1>
          <p className="subtitle">
            Demonstrating Conditional Rendering and Component Lifecycle in React
          </p>
        </div>
      </header>

      <main className="app-main">
        {/* Part A: Conditional Rendering */}
        <section className="lab-section">
          <div
            className="section-header"
            onClick={() => toggleSection("part-a")}
          >
            <h2>Part A: Conditional Rendering</h2>
            <p className="section-subtitle">Login/Logout Message Exercise</p>
            <button className="expand-btn">
              {expandedSection === "part-a" ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>

          {expandedSection === "part-a" && (
            <div className="section-content">
              <div className="section-description">
                <p>✏️ <strong>Theory:</strong> Conditional rendering allows components to display different content based on state or props.</p>
                <ul>
                  <li>Uses ternary operators: <code>condition ? true : false</code></li>
                  <li>Or logical AND: <code>condition && component</code></li>
                  <li>Demonstrates state management with useState hook</li>
                </ul>
              </div>
              <Login />
            </div>
          )}
        </section>

        {/* Part B: Component Lifecycle */}
        <section className="lab-section">
          <div
            className="section-header"
            onClick={() => toggleSection("part-b")}
          >
            <h2>Part B: Component Lifecycle</h2>
            <p className="section-subtitle">Message Component with useEffect Hook</p>
            <button className="expand-btn">
              {expandedSection === "part-b" ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>

          {expandedSection === "part-b" && (
            <div className="section-content">
              <div className="section-description">
                <p>✏️ <strong>Theory:</strong> useEffect hook allows us to perform side effects in functional components.</p>
                <ul>
                  <li><strong>Mounting:</strong> Component added to DOM</li>
                  <li><strong>Unmounting:</strong> Component removed from DOM</li>
                  <li><strong>Empty dependency array []:</strong> Runs effect once on mount, cleanup on unmount</li>
                  <li><strong>Cleanup function:</strong> Returned function runs before unmounting</li>
                </ul>
              </div>

              <div className="part-b-controls">
                <button
                  className={`toggle-section-btn ${
                    showMessage ? "active" : "inactive"
                  }`}
                  onClick={() => setShowMessage(!showMessage)}
                >
                  {showMessage ? "Hide Message" : "Show Message"}
                </button>
              </div>

              {showMessage && <Message />}

              <div className="console-info">
                <p>📋 Check the browser console to see mount/unmount logs!</p>
              </div>
            </div>
          )}
        </section>

        {/* Part D: Lab Exercises */}
        <section className="lab-section">
          <div
            className="section-header"
            onClick={() => toggleSection("part-d")}
          >
            <h2>Part D: Advanced Exercises</h2>
            <p className="section-subtitle">Multiple components demonstrating key concepts</p>
            <button className="expand-btn">
              {expandedSection === "part-d" ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>

          {expandedSection === "part-d" && (
            <div className="section-content">
              {/* Exercise 1 & 2: ToggleMessage */}
              <div className="exercise-wrapper">
                <h3>Exercise 1 & 2: Multiple Messages with Lifecycle Logs</h3>
                <ToggleMessage />
              </div>

              {/* Exercise 3: Props + Conditional Rendering */}
              <div className="exercise-wrapper">
                <h3>Exercise 3: Props + Conditional Rendering</h3>
                <PropMessage />
              </div>

              {/* Exercise 4: Countdown */}
              <div className="exercise-wrapper">
                <h3>Exercise 4: Countdown Timer with Cleanup</h3>
                <Countdown />
              </div>
            </div>
          )}
        </section>

        {/* Key Concepts Summary */}
        <section className="lab-section">
          <div
            className="section-header"
            onClick={() => toggleSection("concepts")}
          >
            <h2>Key Concepts Explained</h2>
            <button className="expand-btn">
              {expandedSection === "concepts" ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>

          {expandedSection === "concepts" && (
            <div className="section-content">
              <div className="concepts-grid">
                <div className="concept-card">
                  <h3>useState Hook</h3>
                  <p>
                    Returns [stateVariable, setStateFunction]. Updating state triggers re-render.
                  </p>
                  <code>const [state, setState] = useState(initialValue);</code>
                </div>

                <div className="concept-card">
                  <h3>useEffect Hook</h3>
                  <p>
                    Performs side effects in functional components. Cleanup function runs before unmounting.
                  </p>
                  <code>useEffect(() => {'{}'} {'{}'}, [dependencies]);</code>
                </div>

                <div className="concept-card">
                  <h3>Ternary Operator</h3>
                  <p>
                    Conditional rendering syntax: condition ? valueIfTrue : valueIfFalse
                  </p>
                  <code>{'{'}isLoggedIn ? 'Welcome' : 'Login'{'}'}}</code>
                </div>

                <div className="concept-card">
                  <h3>Logical AND (&amp;&amp;)</h3>
                  <p>
                    Renders component only if condition is true. Undefined/null doesn't render.
                  </p>
                  <code>{'{'}showMessage && <Message />{'}'}}</code>
                </div>

                <div className="concept-card">
                  <h3>Component Lifecycle</h3>
                  <p>
                    <strong>Mount:</strong> Component added to DOM<br/>
                    <strong>Unmount:</strong> Component removed from DOM
                  </p>
                </div>

                <div className="concept-card">
                  <h3>Props</h3>
                  <p>
                    Pass data from parent to child components. Read-only in child components.
                  </p>
                  <code>&lt;Child message="Hello" /&gt;</code>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="app-footer">
        <p>
          Lab #7 - React Conditional Rendering and Component Lifecycle | Web
          Engineering Lab
        </p>
        <p>💡 Open browser console (F12) to see lifecycle logs</p>
      </footer>
    </div>
  );
};

export default App;
