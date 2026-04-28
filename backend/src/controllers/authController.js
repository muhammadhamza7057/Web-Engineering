import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';

// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide username and password',
      });
    }

    // Check for admin (simplified - in production use proper auth)
    if (username === 'admin' && password === process.env.ADMIN_PASSWORD || password === 'admin123') {
      const token = jwt.sign(
        { username: 'admin', role: 'admin' },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '7d' }
      );

      return res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          username: 'admin',
          role: 'admin',
        },
      });
    }

    res.status(401).json({
      success: false,
      message: 'Invalid credentials',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error during login',
      error: error.message,
    });
  }
};

// @desc    Verify token
// @route   POST /api/auth/verify
// @access  Private
export const verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');

    res.status(200).json({
      success: true,
      message: 'Token is valid',
      user: decoded,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
      error: error.message,
    });
  }
};
