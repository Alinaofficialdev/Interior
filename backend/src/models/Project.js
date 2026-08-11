const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true
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
  category: {
    type: String,
    enum: ['Residential', 'Commercial', 'Retail'],
    default: 'Residential'
  },
  location: {
    type: String,
    required: true,
    default: 'Dubai, UAE'
  },
  scope: {
    type: String,
    default: 'Full Fit-out & Turnkey Interior'
  },
  duration: {
    type: String,
    default: '12 Weeks'
  },
  coverImage: {
    type: String,
    required: true
  },
  gallery: [{
    type: String
  }],
  beforeImages: [{
    type: String
  }],
  afterImages: [{
    type: String
  }],
  isFeatured: {
    type: Boolean,
    default: false
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  seo: {
    title: String,
    description: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
