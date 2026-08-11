const mongoose = require('mongoose');

const designStyleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  characteristics: [{
    type: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('DesignStyle', designStyleSchema);
