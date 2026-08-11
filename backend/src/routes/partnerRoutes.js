const express = require('express');
const router = express.Router();
const { getPartners, createPartner, updatePartner, deletePartner } = require('../controllers/partnerController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getPartners);
router.post('/', protect, authorize('admin', 'editor'), createPartner);
router.put('/:id', protect, authorize('admin', 'editor'), updatePartner);
router.delete('/:id', protect, authorize('admin', 'editor'), deletePartner);

module.exports = router;
