const mongoose = require('mongoose');

const siteSettingSchema = new mongoose.Schema({
  companyName: {
    type: String,
    default: 'Aura Luxury Interiors & Renovations Dubai'
  },
  tagline: {
    type: String,
    default: 'Bespoke Fit-Out, Joinery & Architectural Renovation in Dubai'
  },
  phone: {
    type: String,
    default: '+971 4 800 9988'
  },
  whatsapp: {
    type: String,
    default: '+971501234567'
  },
  email: {
    type: String,
    default: 'info@aurainteriors.ae'
  },
  address: {
    type: String,
    default: 'Design District (D3), Building 4, Suite 302, Dubai, United Arab Emirates'
  },
  socialMedia: {
    instagram: { type: String, default: 'https://instagram.com' },
    facebook: { type: String, default: 'https://facebook.com' },
    linkedin: { type: String, default: 'https://linkedin.com' },
    pinterest: { type: String, default: 'https://pinterest.com' }
  },
  statistics: {
    yearsExperience: { type: Number, default: 14 },
    completedProjects: { type: Number, default: 350 },
    teamMembers: { type: Number, default: 45 },
    propertyInspections: { type: Number, default: 820 },
    customerRating: { type: Number, default: 4.9 }
  },
  seoDefaults: {
    metaTitle: { type: String, default: 'Luxury Interior Design & Renovation Contractors in Dubai' },
    metaDescription: { type: String, default: 'Premier interior fit-out, custom joinery, villa renovation, and property inspection services across Dubai, UAE.' }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SiteSetting', siteSettingSchema);
