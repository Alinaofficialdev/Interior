const Service = require('../models/Service');
const slugify = require('slugify');

// Mock data for fallback when MongoDB is not connected
const mockServices = [
  {
    _id: '1',
    name: 'Villa Renovation',
    slug: 'villa-renovation',
    category: 'Renovation',
    shortDescription: 'Complete villa architectural redesign and interior transformations across Dubai.',
    description: 'Luxury villa fit-out, structural modification, pool deck integration, and high-end finishing tailored for Palm Jumeirah, Emirates Hills, and Dubai Hills.',
    features: ['Custom Joinery & Millwork', 'Structural Modifications', 'Smart Home Integration', 'Landscape & Pool Integration'],
    heroImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    displayOrder: 1,
    isActive: true
  },
  {
    _id: '2',
    name: 'Full Home Renovation',
    slug: 'full-home-renovation',
    category: 'Renovation',
    shortDescription: 'End-to-end residential fit-out and refurbishment for luxury apartments and penthouses.',
    description: 'Comprehensive apartment transformations including MEP, flooring, bespoke cabinetry, and ceiling lighting.',
    features: ['Turnkey Design & Execution', 'Bespoke Furniture', 'Spatial Planning', 'Authority Approvals (DDA / Dubai Municipality)'],
    heroImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    displayOrder: 2,
    isActive: true
  },
  {
    _id: '3',
    name: 'Kitchen Renovation',
    slug: 'kitchen-renovation',
    category: 'Joinery & Fit-out',
    shortDescription: 'Custom German & Italian style kitchens with sintered stone worktops.',
    description: 'Ergonomic luxury kitchens with soft-close Blum hardware, integrated Miele appliances, and custom marble waterfalls.',
    features: ['Quartz & Marble Countertops', 'Custom Cabinetry', 'Integrated Lighting', 'Appliance Integration'],
    heroImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80',
    displayOrder: 3,
    isActive: true
  },
  {
    _id: '4',
    name: 'Bathroom Renovation',
    slug: 'bathroom-renovation',
    category: 'Joinery & Fit-out',
    shortDescription: 'Spa-inspired master bathroom fit-outs with bookmatched Italian porcelain.',
    description: 'Transform your bathroom into a luxury retreat featuring freestanding tubs, concealed rain showers, and heated anti-fog mirrors.',
    features: ['Italian Large-Format Porcelain', 'Rain Showers & Concealed Valves', 'Custom Vanities', 'Waterproofing Certification'],
    heroImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80',
    displayOrder: 4,
    isActive: true
  },
  {
    _id: '5',
    name: 'Bespoke Joinery',
    slug: 'bespoke-joinery',
    category: 'Joinery & Fit-out',
    shortDescription: 'In-house custom cabinetry, walk-in closets, and feature wood paneling.',
    description: 'Crafted in our Dubai factory with premium veneers, solid oak, brass inlay, and integrated LED accent lighting.',
    features: ['Custom Walk-in Wardrobes', 'TV & Media Wall Units', 'Fluted Wood Panels', 'Concealed Storage Solutions'],
    heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    displayOrder: 5,
    isActive: true
  },
  {
    _id: '6',
    name: 'Microcement',
    slug: 'microcement',
    category: 'Specialty Finishes',
    shortDescription: 'Seamless jointless microcement flooring and wall finishes for modern Japandi interiors.',
    description: 'Minimalist continuous microcement application ideal for bathrooms, living spaces, and commercial showrooms.',
    features: ['Seamless & Waterproof', 'Tactile Textured Finish', 'High Mechanical Resistance', 'Custom Color Palette'],
    heroImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    displayOrder: 6,
    isActive: true
  }
];

// @desc    Get Active Services for Public Website
// @route   GET /api/v1/services
// @access  Public
exports.getServices = async (req, res, next) => {
  try {
    const isPublic = !req.user;
    const query = isPublic ? { isActive: true } : {};

    // Try to get from MongoDB first
    let services;
    try {
      services = await Service.find(query).sort({ displayOrder: 1, createdAt: -1 });
    } catch (dbError) {
      // Fallback to mock data if MongoDB fails
      console.log('Using mock services data');
      services = mockServices.filter(s => isPublic ? s.isActive : true);
    }

    res.status(200).json({
      success: true,
      data: services
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Service Detail by Slug
// @route   GET /api/v1/services/:slug
// @access  Public
exports.getServiceBySlug = async (req, res, next) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.status(200).json({
      success: true,
      data: service
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create New Service
// @route   POST /api/v1/services
// @access  Private (Admin / Editor)
exports.createService = async (req, res, next) => {
  try {
    const { name, category, shortDescription, description, features, heroImage, displayOrder, isActive, seo } = req.body;

    const slug = slugify(name, { lower: true, strict: true });

    const service = await Service.create({
      name,
      slug,
      category: category || 'Renovation',
      shortDescription,
      description,
      features: features || [],
      heroImage,
      displayOrder: displayOrder || 0,
      isActive: isActive !== undefined ? isActive : true,
      seo
    });

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: service
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Service
// @route   PUT /api/v1/services/:id
// @access  Private (Admin / Editor)
exports.updateService = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (name) {
      req.body.slug = slugify(name, { lower: true, strict: true });
    }

    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Service updated successfully',
      data: service
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete Service
// @route   DELETE /api/v1/services/:id
// @access  Private (Admin / Editor)
exports.deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
