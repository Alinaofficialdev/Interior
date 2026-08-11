import mongoose from 'mongoose';

const galleryItemSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    caption: { type: String, default: '' },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, default: '' },
    category: {
      type: String,
      enum: ['residential', 'commercial', 'retail'],
      default: 'residential',
    },
    serviceTypes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
    designStyle: { type: mongoose.Schema.Types.ObjectId, ref: 'DesignStyle' },
    location: { type: String, default: '' },
    coverImage: { type: String, default: '' },
    gallery: [galleryItemSchema],
    beforeAfter: {
      before: { type: String, default: '' },
      after: { type: String, default: '' },
    },
    scope: { type: String, default: '' },
    duration: { type: String, default: '' },
    isFeatured: { type: Boolean, default: false },
    completedAt: { type: Date },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

projectSchema.index({ category: 1, isPublished: 1 });

export const Project = mongoose.model('Project', projectSchema);