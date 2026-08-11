const express = require('express');
const router = express.Router();
const { getSettings, updateSettings } = require('../controllers/siteSettingController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getSettings);
router.put('/', protect, authorize('admin'), updateSettings);

module.exports = router;
