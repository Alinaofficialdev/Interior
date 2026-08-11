const express = require('express');
const router = express.Router();
const { getReviews, createReview, updateReview, deleteReview } = require('../controllers/reviewController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getReviews);
router.post('/', protect, authorize('admin', 'editor'), createReview);
router.put('/:id', protect, authorize('admin', 'editor'), updateReview);
router.delete('/:id', protect, authorize('admin', 'editor'), deleteReview);

module.exports = router;
