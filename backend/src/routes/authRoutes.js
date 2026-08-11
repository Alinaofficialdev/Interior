const express = require('express');
const router = express.Router();
const { login, refreshToken, getMe, logout } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { loginLimiter } = require('../middleware/rateLimiter');

router.post('/login', loginLimiter, login);
router.post('/refresh', refreshToken);
router.get('/me', protect, getMe);
router.post('/logout', logout);

module.exports = router;
