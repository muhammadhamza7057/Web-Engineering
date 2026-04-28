import express from 'express';
import {
  createFeedback,
  getAllFeedbacks,
  getFeedbacksBySubject,
  getFeedbackStats,
  deleteFeedback,
  updateFeedback,
} from '../controllers/feedbackController.js';
import { validateFeedback, handleValidationErrors } from '../middleware/validation.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.post('/', validateFeedback, handleValidationErrors, createFeedback);

// Protected routes (Admin only)
router.get('/', protect, getAllFeedbacks);
router.get('/stats/all', protect, getFeedbackStats);
router.get('/:subject', protect, getFeedbacksBySubject);
router.delete('/:id', protect, deleteFeedback);
router.put('/:id', protect, updateFeedback);

export default router;
