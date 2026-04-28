import Feedback from '../models/Feedback.js';
import { validationResult } from 'express-validator';

// @desc    Create new feedback
// @route   POST /api/feedback
// @access  Public
export const createFeedback = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array(),
      });
    }

    const { studentName, subject, rating, comments, email } = req.body;

    const feedback = new Feedback({
      studentName,
      subject,
      rating,
      comments: comments || '',
      email,
    });

    await feedback.save();

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully',
      data: feedback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error submitting feedback',
      error: error.message,
    });
  }
};

// @desc    Get all feedbacks with pagination
// @route   GET /api/feedbacks
// @access  Private (Admin)
export const getAllFeedbacks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const feedbacks = await Feedback.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Feedback.countDocuments();
    const pages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      data: feedbacks,
      pagination: {
        currentPage: page,
        totalPages: pages,
        totalDocuments: total,
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching feedbacks',
      error: error.message,
    });
  }
};

// @desc    Get feedbacks by subject
// @route   GET /api/feedbacks/:subject
// @access  Private (Admin)
export const getFeedbacksBySubject = async (req, res) => {
  try {
    const { subject } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const feedbacks = await Feedback.find({ subject })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Feedback.countDocuments({ subject });
    const pages = Math.ceil(total / limit);

    // Calculate average rating
    const avgRating = await Feedback.aggregate([
      { $match: { subject } },
      {
        $group: {
          _id: '$subject',
          averageRating: { $avg: '$rating' },
          totalCount: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: feedbacks,
      averageRating: avgRating.length > 0 ? avgRating[0].averageRating : 0,
      pagination: {
        currentPage: page,
        totalPages: pages,
        totalDocuments: total,
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching feedbacks by subject',
      error: error.message,
    });
  }
};

// @desc    Get feedback statistics
// @route   GET /api/feedbacks/stats/all
// @access  Private (Admin)
export const getFeedbackStats = async (req, res) => {
  try {
    const stats = await Feedback.aggregate([
      {
        $group: {
          _id: '$subject',
          averageRating: { $avg: '$rating' },
          totalFeedbacks: { $sum: 1 },
          maxRating: { $max: '$rating' },
          minRating: { $min: '$rating' },
        },
      },
      {
        $sort: { averageRating: -1 },
      },
    ]);

    const totalFeedbacks = await Feedback.countDocuments();
    const overallAverageRating =
      (await Feedback.aggregate([
        {
          $group: {
            _id: null,
            avgRating: { $avg: '$rating' },
          },
        },
      ])) || [];

    res.status(200).json({
      success: true,
      data: {
        stats,
        totalFeedbacks,
        overallAverageRating:
          overallAverageRating.length > 0
            ? overallAverageRating[0].avgRating
            : 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message,
    });
  }
};

// @desc    Delete feedback
// @route   DELETE /api/feedbacks/:id
// @access  Private (Admin)
export const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;

    const feedback = await Feedback.findByIdAndDelete(id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Feedback deleted successfully',
      data: feedback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting feedback',
      error: error.message,
    });
  }
};

// @desc    Update feedback
// @route   PUT /api/feedbacks/:id
// @access  Private (Admin)
export const updateFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentName, subject, rating, comments } = req.body;

    let feedback = await Feedback.findById(id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found',
      });
    }

    feedback.studentName = studentName || feedback.studentName;
    feedback.subject = subject || feedback.subject;
    feedback.rating = rating || feedback.rating;
    feedback.comments = comments !== undefined ? comments : feedback.comments;

    await feedback.save();

    res.status(200).json({
      success: true,
      message: 'Feedback updated successfully',
      data: feedback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating feedback',
      error: error.message,
    });
  }
};
