import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Analytics-professional.css';

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [allFeedbacks, setAllFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('adminToken');

      if (!token) {
        setError('Please log in again to view the dashboard.');
        setLoading(false);
        return;
      }

      try {
        const headers = { Authorization: `Bearer ${token}` };
        const [statsResult, feedbackResult] = await Promise.allSettled([
          axios.get('/api/feedback/stats/all', { headers }),
          axios.get('/api/feedback?limit=100', { headers }),
        ]);

        if (statsResult.status === 'fulfilled' && statsResult.value.data.success) {
          setStats(statsResult.value.data.data);
        }

        if (feedbackResult.status === 'fulfilled' && feedbackResult.value.data.success) {
          setAllFeedbacks(feedbackResult.value.data.data);
        }

        if (
          statsResult.status === 'rejected' &&
          feedbackResult.status === 'rejected'
        ) {
          const statsError = statsResult.reason?.response?.data?.message || statsResult.reason?.message || 'Stats request failed';
          const feedbackError = feedbackResult.reason?.response?.data?.message || feedbackResult.reason?.message || 'Feedback request failed';
          throw new Error(`${statsError}. ${feedbackError}`);
        }
      } catch (err) {
        setError(err.message || 'Failed to load dashboard data');
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="analytics-loading">
      <div className="spinner"></div>
      <p>Loading analytics...</p>
    </div>;
  }

  if (error) {
    return <div className="analytics-error">
      <span className="error-icon">!</span>
      <p>{error}</p>
    </div>;
  }

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return '#10B981'; // Green
    if (rating >= 3) return '#F59E0B'; // Amber
    return '#EF4444'; // Red
  };

  const getRatingStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className="star" style={{ color: i < Math.round(rating) ? '#FFD700' : '#E5E7EB' }}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h2>Admin Dashboard</h2>
        <p className="subtitle">Feedback Analytics & Student Submissions</p>
      </div>

      {/* Overall Stats Cards */}
      {stats && (
        <div className="stats-grid">
            <div className="stat-card">
            <div className="stat-icon">1</div>
            <div className="stat-content">
              <h3>Total Feedback</h3>
              <p className="stat-value">{stats.totalFeedbacks}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">2</div>
            <div className="stat-content">
              <h3>Average Rating</h3>
              <p className="stat-value">{stats.overallAverageRating.toFixed(2)}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">3</div>
            <div className="stat-content">
              <h3>Subject Count</h3>
              <p className="stat-value">{stats.stats.length}</p>
            </div>
          </div>
        </div>
      )}

      {/* Subject-wise Breakdown */}
      {stats && stats.stats.length > 0 && (
        <div className="breakdown-section">
          <h3>Subject-wise Breakdown</h3>
          <div className="breakdown-table">
              <div className="table-header">
              <div className="col-subject">Subject</div>
              <div className="col-count">Count</div>
              <div className="col-avg">Avg Rating</div>
              <div className="col-range">Rating Range</div>
            </div>
            {stats.stats.map((stat, index) => (
              <div key={index} className="table-row">
                <div className="col-subject">
                  <span className="subject-badge">{stat._id}</span>
                </div>
                <div className="col-count">{stat.totalFeedbacks}</div>
                <div className="col-avg">
                  <div className="rating-bar">
                    <div className="rating-fill" style={{ width: `${(stat.averageRating / 5) * 100}%`, backgroundColor: getRatingColor(stat.averageRating) }}></div>
                  </div>
                  <span className="rating-text">{stat.averageRating.toFixed(2)}</span>
                </div>
                <div className="col-range">{stat.minRating} - {stat.maxRating}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Student Feedbacks */}
      <div className="feedbacks-section">
        <h3>All Student Submissions ({allFeedbacks.length})</h3>
        {allFeedbacks.length > 0 ? (
          <div className="feedbacks-list">
            {allFeedbacks.map((feedback, index) => (
              <div key={feedback._id} className="feedback-item">
                <div className="feedback-header">
                  <div className="student-info">
                    <h4>{feedback.studentName}</h4>
                    <p className="student-email">{feedback.email}</p>
                  </div>
                  <div className="feedback-meta">
                    <span className="subject-tag">{feedback.subject}</span>
                    <span className="rating-badge" style={{ borderColor: getRatingColor(feedback.rating) }}>
                      {getRatingStars(feedback.rating)}
                    </span>
                  </div>
                </div>
                <div className="feedback-body">
                  <p className="comments">{feedback.comments || 'No comments'}</p>
                  <p className="timestamp">
                    {new Date(feedback.createdAt).toLocaleDateString()} at {new Date(feedback.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No student feedback submitted yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
