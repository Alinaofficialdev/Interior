const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  url: { type: String, required: true },
  publicId: String,
  type: { type: String, enum: ['image', 'video'], default: 'image' },
  mimeType: String,
  size: Number,
  width: Number,
  height: Number,
  altText: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Media', mediaSchema);
