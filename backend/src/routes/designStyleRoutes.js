const express = require('express');
const router = express.Router();
const { getDesignStyles, getDesignStyleBySlug, createDesignStyle, updateDesignStyle, deleteDesignStyle } = require('../controllers/designStyleController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getDesignStyles);
router.get('/:slug', getDesignStyleBySlug);
router.post('/', protect, authorize('admin', 'editor'), createDesignStyle);
router.put('/:id', protect, authorize('admin', 'editor'), updateDesignStyle);
router.delete('/:id', protect, authorize('admin', 'editor'), deleteDesignStyle);

module.exports = router;
