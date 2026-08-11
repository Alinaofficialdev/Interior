const express = require('express');
const router = express.Router();
const { createQuote, getQuotes, getQuoteById, updateQuoteStatus, deleteQuote } = require('../controllers/quoteController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('admin'), createQuote);
router.get('/', protect, authorize('admin', 'editor'), getQuotes);
router.get('/:id', getQuoteById);
router.put('/:id/status', protect, updateQuoteStatus);
router.delete('/:id', protect, authorize('admin'), deleteQuote);

module.exports = router;
