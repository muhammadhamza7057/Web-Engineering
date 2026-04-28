import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '../styles/FeedbackForm-professional.css';

const FeedbackForm = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      studentName: '',
      email: '',
      subject: 'Mathematics',
      rating: 5,
      comments: '',
    },
    mode: 'onBlur',
  });

  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const commentsValue = watch('comments');

  const onSubmit = async (data) => {
    try {
      setApiError('');
      setSuccessMessage('');

      const response = await axios.post('/api/feedback', {
        ...data,
        rating: parseInt(data.rating),
      });

      if (response.data.success) {
        setSuccessMessage('✅ Feedback submitted successfully! Thank you for your input.');
        reset();
        onSuccess?.();
        
        // Auto-clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      setApiError(
        error.response?.data?.message || 
        'Failed to submit feedback. Please try again.'
      );
    }
  };

  return (
    <div className="feedback-form-container">
      <div className="form-header">
        <h2>Share Your Feedback</h2>
        <p className="form-subtitle">Help us improve by sharing your feedback</p>
      </div>

      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      {apiError && (
        <div className="alert alert-error" role="alert">
          ❌ {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="feedback-form">
        {/* Student Name Field */}
        <div className="form-group">
          <label htmlFor="studentName" className="form-label">
            Student Name <span className="required">*</span>
          </label>
          <input
            id="studentName"
            type="text"
            placeholder="Enter your full name"
            {...register('studentName', {
              required: 'Student name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters',
              },
              maxLength: {
                value: 50,
                message: 'Name cannot exceed 50 characters',
              },
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: 'Name can only contain letters and spaces',
              },
            })}
            className={`form-input ${errors.studentName ? 'input-error' : ''}`}
            disabled={isSubmitting}
          />
          {errors.studentName && (
            <span className="error-message">{errors.studentName.message}</span>
          )}
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email <span className="required">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address',
              },
            })}
            className={`form-input ${errors.email ? 'input-error' : ''}`}
            disabled={isSubmitting}
          />
          {errors.email && (
            <span className="error-message">{errors.email.message}</span>
          )}
        </div>

        {/* Subject Field */}
        <div className="form-group">
          <label htmlFor="subject" className="form-label">
            Subject <span className="required">*</span>
          </label>
          <select
            id="subject"
            {...register('subject', { required: 'Subject is required' })}
            className={`form-input form-select ${errors.subject ? 'input-error' : ''}`}
            disabled={isSubmitting}
          >
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
            <option value="Computer Science">Computer Science</option>
            <option value="History">History</option>
            <option value="English">English</option>
            <option value="Other">Other</option>
          </select>
          {errors.subject && (
            <span className="error-message">{errors.subject.message}</span>
          )}
        </div>

        {/* Rating Field */}
        <div className="form-group">
          <label htmlFor="rating" className="form-label">
            Rating <span className="required">*</span> (1-5 stars)
          </label>
          <div className="rating-group">
            <select
              id="rating"
              {...register('rating', { required: 'Rating is required' })}
              className={`form-input form-select ${errors.rating ? 'input-error' : ''}`}
              disabled={isSubmitting}
            >
              <option value="5">⭐⭐⭐⭐⭐ Excellent (5)</option>
              <option value="4">⭐⭐⭐⭐ Good (4)</option>
              <option value="3">⭐⭐⭐ Average (3)</option>
              <option value="2">⭐⭐ Poor (2)</option>
              <option value="1">⭐ Very Poor (1)</option>
            </select>
          </div>
          {errors.rating && (
            <span className="error-message">{errors.rating.message}</span>
          )}
        </div>

        {/* Comments Field */}
        <div className="form-group">
          <label htmlFor="comments" className="form-label">
            Comments <span className="char-count">({commentsValue?.length || 0}/500)</span>
          </label>
          <textarea
            id="comments"
            placeholder="Share your thoughts, suggestions, or concerns (optional)"
            {...register('comments', {
              maxLength: {
                value: 500,
                message: 'Comments cannot exceed 500 characters',
              },
            })}
            className={`form-input form-textarea ${errors.comments ? 'input-error' : ''}`}
            disabled={isSubmitting}
            rows="4"
          />
          {errors.comments && (
            <span className="error-message">{errors.comments.message}</span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Submitting...
            </>
          ) : (
            '✓ Submit Feedback'
          )}
        </button>
      </form>

      <p className="form-note">
        <strong>Note:</strong> Your feedback is valuable and will help us improve our teaching methods.
      </p>
    </div>
  );
};

export default FeedbackForm;
