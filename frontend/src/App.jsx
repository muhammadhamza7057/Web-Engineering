import React, { useState, useEffect } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import AdminLogin from './components/AdminLogin';
import Analytics from './components/Analytics';
import './styles/App-Professional.css';
import './styles/index-professional.css';
import './styles/FeedbackForm-professional.css';
import './styles/FeedbackList-professional.css';
import './styles/AdminLogin-professional.css';
import './styles/Analytics-professional.css';

const App = () => {
  const [isAdminView, setIsAdminView] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('form');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true);
      setIsAdminView(true);
      setActiveTab('dashboard');
    }
  }, []);

  const handleAdminLogin = () => {
    setIsLoggedIn(true);
    setIsAdminView(true);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    setIsAdminView(false);
    setActiveTab('form');
  };

  const toggleAdminMode = () => {
    setIsAdminView(!isAdminView);
    setActiveTab(isAdminView ? 'form' : 'dashboard');
  };

  return (
    <div className="app-container">
      {/* Professional Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          {/* Brand */}
          <div className="navbar-brand">
            <svg className="brand-icon" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
              <path d="M10 17l-5-5m0 0l1.41-1.41L10 14.17l7.59-7.59L19 8"/>
            </svg>
            <span className="brand-text">FeedBack Pro</span>
          </div>

          {/* Right Actions */}
          <div className="navbar-actions">
            {isLoggedIn ? (
              <>
                <div className="admin-badge">
                  <svg className="badge-icon" viewBox="0 0 24 24" fill="white">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  <span>Admin Panel</span>
                </div>
                <button className="logout-btn" onClick={handleLogout} title="Sign out from admin panel">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5m0 0l-5-5"/>
                  </svg>
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button 
                className="logout-btn" 
                onClick={toggleAdminMode}
                title={isAdminView ? 'Switch to student mode' : 'Switch to admin mode'}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  {isAdminView ? (
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  ) : (
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/>
                  )}
                </svg>
                <span>{isAdminView ? 'Student Mode' : 'Admin Mode'}</span>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="main-container">
        {/* Admin View */}
        {isAdminView && !isLoggedIn ? (
          <AdminLogin onLoginSuccess={handleAdminLogin} />
        ) : isAdminView && isLoggedIn ? (
          <>
            {/* Admin Tabs */}
            <div className="tabs-container">
              <button 
                className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('dashboard')}
                title="View analytics and statistics"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                </svg>
                Dashboard
              </button>
              <button 
                className={`tab-btn ${activeTab === 'feedback' ? 'active' : ''}`}
                onClick={() => setActiveTab('feedback')}
                title="View all student feedback submissions"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                </svg>
                All Feedback
              </button>
            </div>

            {/* Admin Content */}
            <div className="content-area">
              {activeTab === 'dashboard' && <Analytics />}
              {activeTab === 'feedback' && <FeedbackList />}
            </div>
          </>
        ) : (
          <>
            {/* Student Tabs */}
            <div className="tabs-container">
              <button 
                className={`tab-btn ${activeTab === 'form' ? 'active' : ''}`}
                onClick={() => setActiveTab('form')}
                title="Submit your feedback here"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"/>
                  <path d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
                Submit Feedback
              </button>
              <button 
                className={`tab-btn ${activeTab === 'view' ? 'active' : ''}`}
                onClick={() => setActiveTab('view')}
                title="View all feedback submissions"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
                View Feedback
              </button>
            </div>

            {/* Student Content */}
            <div className="content-area">
              {activeTab === 'form' && <FeedbackForm />}
              {activeTab === 'view' && <FeedbackList />}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div>
            <p>&copy; 2024 FeedBack Pro. All rights reserved.</p>
          </div>
          <div className="footer-links">
            <span>✨ Built with React + Express + MongoDB</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
