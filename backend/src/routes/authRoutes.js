import express from 'express';
import { loginAdmin, verifyToken } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/verify', verifyToken);

export default router;
