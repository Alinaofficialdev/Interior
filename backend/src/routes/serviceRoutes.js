const express = require('express');
const router = express.Router();
const { getServices, getServiceBySlug, createService, updateService, deleteService } = require('../controllers/serviceController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getServices);
router.get('/:slug', getServiceBySlug);
router.post('/', protect, authorize('admin', 'editor'), createService);
router.put('/:id', protect, authorize('admin', 'editor'), updateService);
router.delete('/:id', protect, authorize('admin', 'editor'), deleteService);

module.exports = router;
