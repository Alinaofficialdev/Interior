const express = require('express');
const router = express.Router();
const { getProjects, getProjectBySlug, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getProjects);
router.get('/:slug', getProjectBySlug);
router.post('/', protect, authorize('admin', 'editor'), createProject);
router.put('/:id', protect, authorize('admin', 'editor'), updateProject);
router.delete('/:id', protect, authorize('admin', 'editor'), deleteProject);

module.exports = router;
