const express = require('express');
const router = express.Router();
const { createLead, getLeads, getLeadById, updateLead, addLeadNote, deleteLead } = require('../controllers/leadController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { leadSubmissionLimiter } = require('../middleware/rateLimiter');

router.post('/', leadSubmissionLimiter, createLead);
router.get('/', protect, authorize('admin', 'editor'), getLeads);
router.get('/:id', protect, authorize('admin', 'editor'), getLeadById);
router.put('/:id', protect, authorize('admin', 'editor'), updateLead);
router.post('/:id/notes', protect, authorize('admin', 'editor'), addLeadNote);
router.delete('/:id', protect, authorize('admin'), deleteLead);

module.exports = router;
