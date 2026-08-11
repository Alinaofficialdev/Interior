const SiteSetting = require('../models/SiteSetting');

// @desc    Get Site Settings (Public)
// @route   GET /api/v1/settings
// @access  Public
exports.getSettings = async (req, res, next) => {
  try {
    let settings = await SiteSetting.findOne();
    if (!settings) {
      settings = await SiteSetting.create({});
    }
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Site Settings
// @route   PUT /api/v1/settings
// @access  Private (Admin Only)
exports.updateSettings = async (req, res, next) => {
  try {
    let settings = await SiteSetting.findOne();
    if (!settings) {
      settings = await SiteSetting.create(req.body);
    } else {
      settings = await SiteSetting.findByIdAndUpdate(settings._id, req.body, {
        new: true,
        runValidators: true
      });
    }
    res.status(200).json({
      success: true,
      message: 'Site settings updated successfully',
      data: settings
    });
  } catch (error) {
    next(error);
  }
};
