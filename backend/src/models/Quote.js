const mongoose = require('mongoose');

const quoteItemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  category: { type: String, default: 'Fit-out' },
  quantity: { type: Number, required: true, default: 1 },
  unit: { type: Number, default: 1 }, // unit count or unit measurement
  unitPrice: { type: Number, required: true },
  lineTotal: { type: Number, required: true }
});

const quoteSchema = new mongoose.Schema({
  quoteNumber: {
    type: String,
    required: true,
    unique: true
  },
  lead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lead'
  },
  leadName: {
    type: String
  },
  leadEmail: {
    type: String
  },
  items: [quoteItemSchema],
  subtotal: {
    type: Number,
    required: true,
    default: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  tax: {
    type: Number,
    default: 0
  },
  grandTotal: {
    type: Number,
    required: true,
    default: 0
  },
  currency: {
    type: String,
    default: 'AED'
  },
  status: {
    type: String,
    enum: ['Draft', 'Sent', 'Accepted', 'Rejected'],
    default: 'Draft'
  },
  validUntil: {
    type: Date
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Quote', quoteSchema);
