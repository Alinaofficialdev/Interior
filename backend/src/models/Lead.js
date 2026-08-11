const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const leadSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  propertyType: {
    type: String,
    enum: ['Villa', 'Apartment', 'Office', 'Commercial', 'Retail', 'Other'],
    default: 'Villa'
  },
  service: {
    type: String,
    required: [true, 'Requested service is required']
  },
  location: {
    type: String,
    default: 'Dubai'
  },
  message: {
    type: String,
    trim: true
  },
  preferredContactMethod: {
    type: String,
    enum: ['Phone', 'WhatsApp', 'Email'],
    default: 'WhatsApp'
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Quoted', 'Won', 'Lost'],
    default: 'New'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  assignedToName: {
    type: String
  },
  source: {
    type: String,
    default: 'Public Website'
  },
  utmSource: String,
  utmMedium: String,
  utmCampaign: String,
  notes: [noteSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Lead', leadSchema);
