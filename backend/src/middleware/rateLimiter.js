const rateLimit = require('express-rate-limit');

// FR-079: Limit repeated lead submissions to 5 per IP address per hour
const leadSubmissionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: {
    success: false,
    message: 'Submission limit reached. Please try again after 1 hour or contact us directly via WhatsApp.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// FR-093: Limit login attempts to 5 per 15 minutes
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    success: false,
    message: 'Too many login attempts. Account temporarily locked for 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = { leadSubmissionLimiter, loginLimiter };
