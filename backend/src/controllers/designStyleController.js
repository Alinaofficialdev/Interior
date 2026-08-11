const DesignStyle = require('../models/DesignStyle');
const slugify = require('slugify');

// Mock data for fallback when MongoDB is not connected
const mockDesignStyles = [
  {
    _id: '1',
    name: 'Modern Minimalist',
    slug: 'modern-minimalist',
    description: 'Clean lines, neutral colors, and functional spaces with emphasis on simplicity and open layouts.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    displayOrder: 1
  },
  {
    _id: '2',
    name: 'Contemporary Luxury',
    slug: 'contemporary-luxury',
    description: 'High-end materials, sophisticated color palettes, and elegant finishes for modern opulence.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    displayOrder: 2
  },
  {
    _id: '3',
    name: 'Arabian Modern',
    slug: 'arabian-modern',
    description: 'Fusion of traditional Arabic elements with contemporary design, featuring geometric patterns and rich textures.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    displayOrder: 3
  },
  {
    _id: '4',
    name: 'Japandi Style',
    slug: 'japandi-style',
    description: 'Japanese minimalism meets Scandinavian warmth - natural materials, muted colors, and functional elegance.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    displayOrder: 4
  },
  {
    _id: '5',
    name: 'Industrial Chic',
    slug: 'industrial-chic',
    description: 'Raw materials, exposed elements, and urban aesthetics with polished finishes for sophisticated edge.',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    displayOrder: 5
  },
  {
    _id: '6',
    name: 'Mediterranean',
    slug: 'mediterranean',
    description: 'Warm earth tones, natural stone, and terracotta elements bringing coastal European charm to Dubai.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    displayOrder: 6
  }
];

exports.getDesignStyles = async (req, res, next) => {
  try {
    // Try to get from MongoDB first
    let styles;
    try {
      styles = await DesignStyle.find().sort({ createdAt: -1 });
    } catch (dbError) {
      // Fallback to mock data if MongoDB fails
      console.log('Using mock design styles data');
      styles = mockDesignStyles;
    }
    res.status(200).json({ success: true, data: styles });
  } catch (error) {
    next(error);
  }
};

exports.getDesignStyleBySlug = async (req, res, next) => {
  try {
    const style = await DesignStyle.findOne({ slug: req.params.slug });
    if (!style) return res.status(404).json({ success: false, message: 'Design style not found' });
    res.status(200).json({ success: true, data: style });
  } catch (error) {
    next(error);
  }
};

exports.createDesignStyle = async (req, res, next) => {
  try {
    const { name, description, image, characteristics } = req.body;
    const slug = slugify(name, { lower: true, strict: true });
    const style = await DesignStyle.create({ name, slug, description, image, characteristics: characteristics || [] });
    res.status(201).json({ success: true, message: 'Design style created successfully', data: style });
  } catch (error) {
    next(error);
  }
};

exports.updateDesignStyle = async (req, res, next) => {
  try {
    if (req.body.name) req.body.slug = slugify(req.body.name, { lower: true, strict: true });
    const style = await DesignStyle.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!style) return res.status(404).json({ success: false, message: 'Design style not found' });
    res.status(200).json({ success: true, message: 'Design style updated successfully', data: style });
  } catch (error) {
    next(error);
  }
};

exports.deleteDesignStyle = async (req, res, next) => {
  try {
    const style = await DesignStyle.findByIdAndDelete(req.params.id);
    if (!style) return res.status(404).json({ success: false, message: 'Design style not found' });
    res.status(200).json({ success: true, message: 'Design style deleted successfully' });
  } catch (error) {
    next(error);
  }
};
