import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/FeedbackList-professional.css';

const FeedbackList = ({ refreshTrigger }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [averageRating, setAverageRating] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const itemsPerPage = 5;

  const subjects = [
    'All',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Computer Science',
    'History',
    'English',
    'Other',
  ];

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    setIsLoggedIn(!!token);
  }, []);

  // Fetch feedbacks
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        setError('');

        const token = localStorage.getItem('adminToken');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        let url = `/api/feedback?page=${currentPage}&limit=${itemsPerPage}`;

        if (selectedSubject !== 'All') {
          url = `/api/feedback/${selectedSubject}?page=${currentPage}&limit=${itemsPerPage}`;
        }

        const response = await axios.get(url, { headers });

        if (response.data.success) {
          setFeedbacks(response.data.data);
          setTotalPages(response.data.pagination.totalPages);
          setAverageRating(response.data.averageRating || 0);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch feedbacks');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [currentPage, selectedSubject, refreshTrigger]);

  // Filter feedbacks based on search term
  useEffect(() => {
    const filtered = feedbacks.filter(
      (feedback) =>
        feedback.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFeedbacks(filtered);
  }, [searchTerm, feedbacks]);

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'rating-excellent';
    if (rating >= 3) return 'rating-good';
    return 'rating-poor';
  };

  const getRatingStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const handleSubjectFilter = (subject) => {
    setSelectedSubject(subject);
    setCurrentPage(1);
    setSearchTerm('');
  };

  const handleDeleteFeedback = async (id) => {
    if (!window.confirm('Are you sure you want to delete this feedback?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setError('You must be logged in to delete feedback');
        return;
      }

      const response = await axios.delete(`/api/feedback/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setFeedbacks(feedbacks.filter((f) => f._id !== id));
      }
    } catch (err) {
      setError('Failed to delete feedback');
    }
  };

  if (loading) {
    return (
      <div className="feedback-list-container loading-container">
        <div className="loader"></div>
        <p>Loading feedbacks...</p>
      </div>
    );
  }

  return (
    <div className="feedback-list-container">
      <div className="list-header">
        <h2>Student Feedbacks</h2>
        <p className="list-subtitle">Review and manage student feedback</p>
      </div>

      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}

      {/* Average Rating Display */}
      {selectedSubject !== 'All' && averageRating > 0 && (
        <div className="average-rating-card">
          <div className="rating-display">
            <span className="rating-value">{averageRating.toFixed(1)}</span>
            <span className="rating-stars">{getRatingStars(Math.round(averageRating))}</span>
          </div>
          <p className="rating-label">Average Rating for {selectedSubject}</p>
        </div>
      )}

      {/* Subject Filter */}
      <div className="filters-section">
        <div className="filter-group">
          <span className="filter-label">Filter by Subject</span>
          <div className="filter-buttons">
            {subjects.map((subject) => (
              <button
                key={subject}
                className={`filter-btn ${selectedSubject === subject ? 'active' : ''}`}
                onClick={() => handleSubjectFilter(subject)}
                type="button"
              >
                {subject === 'All' && (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                  </svg>
                )}
                {subject !== 'All' && <span>{subject}</span>}
                {subject === 'All' && <span>All</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="filter-group">
        <span className="filter-label">Search</span>
        <div className="search-input-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search by student name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Feedbacks Display */}
      {filteredFeedbacks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">⌁</div>
          <p>No feedbacks found</p>
          <span className="empty-state-hint">Try a different subject or search term.</span>
        </div>
      ) : (
        <div className="feedbacks-grid">
          {filteredFeedbacks.map((feedback) => (
            <div key={feedback._id} className="feedback-card">
              <div className="card-header">
                <div className="student-details">
                  <h4 className="student-name">{feedback.studentName}</h4>
                  <p className="student-email">{feedback.email}</p>
                </div>
                <div className="card-badges">
                  <span className="subject-badge">{feedback.subject}</span>
                  <span className="rating-display">
                    <span className={`rating-text ${getRatingColor(feedback.rating)}`}>
                      {getRatingStars(feedback.rating)}
                    </span>
                  </span>
                </div>
              </div>

              <div className="card-body">
                <p className="comments">{feedback.comments || 'No comments provided.'}</p>
              </div>

              <div className="card-footer">
                <span className="timestamp">
                  {new Date(feedback.createdAt).toLocaleDateString()}
                </span>
                {isLoggedIn && (
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteFeedback(feedback._id)}
                    title="Delete feedback"
                    type="button"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18" />
                      <path d="M8 6V4h8v2" />
                      <path d="M19 6l-1 14H6L5 6" />
                      <path d="M10 11v6M14 11v6" />
                    </svg>
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {filteredFeedbacks.length > 0 && totalPages > 1 && (
        <div className="pagination-container">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="pagination-btn"
            type="button"
          >
            Previous
          </button>

          <div className="pagination-info">
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="pagination-btn"
            type="button"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedbackList;
