const Project = require('../models/Project');
const slugify = require('slugify');

// Mock data for fallback when MongoDB is not connected
const mockProjects = [
  {
    _id: '1',
    title: 'Palm Jumeirah Signature Villa',
    slug: 'palm-jumeirah-signature-villa',
    category: 'Residential',
    location: 'Palm Jumeirah, Dubai',
    scope: 'Full Villa Structural Renovation & Bespoke Joinery',
    duration: '16 Weeks',
    description: 'A complete architectural transformation of a Frond villa on Palm Jumeirah featuring open-plan living, custom walnut joinery, microcement master suite, and infinity pool view windows.',
    coverImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
    ],
    beforeImages: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'],
    afterImages: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'],
    isFeatured: true,
    isPublished: true
  },
  {
    _id: '2',
    title: 'Downtown Dubai Executive Penthouse',
    slug: 'downtown-dubai-executive-penthouse',
    category: 'Residential',
    location: 'Downtown Dubai',
    scope: 'Turnkey Penthouse Interior & Smart Automation',
    duration: '12 Weeks',
    description: 'Ultra luxury modern minimalist penthouse facing Burj Khalifa with bookmatched Calacatta marble walls, concealed linear AC diffusers, and Lutron lighting control.',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1200&q=80'
    ],
    beforeImages: [],
    afterImages: [],
    isFeatured: true,
    isPublished: true
  },
  {
    _id: '3',
    title: 'Dubai Hills Golf Villa',
    slug: 'dubai-hills-golf-villa',
    category: 'Residential',
    location: 'Dubai Hills Estate',
    scope: 'Contemporary Mediterranean Interior & Landscape',
    duration: '14 Weeks',
    description: 'Elegant Mediterranean-style villa renovation with travertine flooring, custom arched doorways, and infinity pool overlooking the golf course.',
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    beforeImages: [],
    afterImages: [],
    isFeatured: true,
    isPublished: true
  },
  {
    _id: '4',
    title: 'DIFC Premium Office Suite',
    slug: 'difc-premium-office-suite',
    category: 'Commercial',
    location: 'DIFC, Dubai',
    scope: 'Corporate Office Fit-out & Smart Integration',
    duration: '8 Weeks',
    description: 'High-end corporate office with acoustic glass partitions, executive boardroom, and smart building management system integration.',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    gallery: [],
    beforeImages: [],
    afterImages: [],
    isFeatured: false,
    isPublished: true
  },
  {
    _id: '5',
    title: 'Marina Luxury Retail Space',
    slug: 'marina-luxury-retail-space',
    category: 'Retail',
    location: 'Dubai Marina',
    scope: 'High-End Boutique Interior & Display',
    duration: '6 Weeks',
    description: 'Luxury retail boutique with custom display units, accent lighting, and premium finishes for fashion brand.',
    coverImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
    gallery: [],
    beforeImages: [],
    afterImages: [],
    isFeatured: false,
    isPublished: true
  },
  {
    _id: '6',
    title: 'Emirates Hills Mansion',
    slug: 'emirates-hills-mansion',
    category: 'Residential',
    location: 'Emirates Hills',
    scope: 'Complete Mansion Renovation & Landscaping',
    duration: '20 Weeks',
    description: 'Full mansion transformation including structural changes, new wing addition, infinity pool, and comprehensive landscaping.',
    coverImage: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    gallery: [],
    beforeImages: [],
    afterImages: [],
    isFeatured: true,
    isPublished: true
  }
];

// @desc    Get Projects (Public / Filterable)
// @route   GET /api/v1/projects
// @access  Public
exports.getProjects = async (req, res, next) => {
  try {
    const isPublic = !req.user;
    const query = isPublic ? { isPublished: true } : {};

    if (req.query.category && req.query.category !== 'All') {
      query.category = req.query.category;
    }
    if (req.query.featured === 'true') {
      query.isFeatured = true;
    }

    // Try to get from MongoDB first
    let projects;
    try {
      let projectsQuery = Project.find(query).sort({ isFeatured: -1, createdAt: -1 });

      if (req.query.limit) {
        projectsQuery = projectsQuery.limit(parseInt(req.query.limit, 10));
      }

      projects = await projectsQuery;
    } catch (dbError) {
      // Fallback to mock data if MongoDB fails
      console.log('Using mock projects data');
      let filteredProjects = mockProjects.filter(p => isPublic ? p.isPublished : true);
      
      if (req.query.category && req.query.category !== 'All') {
        filteredProjects = filteredProjects.filter(p => p.category === req.query.category);
      }
      if (req.query.featured === 'true') {
        filteredProjects = filteredProjects.filter(p => p.isFeatured);
      }
      if (req.query.limit) {
        filteredProjects = filteredProjects.slice(0, parseInt(req.query.limit, 10));
      }
      
      projects = filteredProjects;
    }

    res.status(200).json({
      success: true,
      data: projects
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Project Detail by Slug
// @route   GET /api/v1/projects/:slug
// @access  Public
exports.getProjectBySlug = async (req, res, next) => {
  try {
    let project;
    try {
      project = await Project.findOne({ slug: req.params.slug });
    } catch (dbError) {
      console.log('Using mock project data for slug:', req.params.slug);
    }

    if (!project) {
      const fallbackProject = mockProjects.find(p => p.slug === req.params.slug);
      if (fallbackProject) {
        return res.status(200).json({
          success: true,
          data: fallbackProject
        });
      }
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create Project
// @route   POST /api/v1/projects
// @access  Private (Admin / Editor)
exports.createProject = async (req, res, next) => {
  try {
    const { title, description, category, location, scope, duration, coverImage, gallery, beforeImages, afterImages, isFeatured, isPublished, seo } = req.body;

    const slug = slugify(title, { lower: true, strict: true });

    // BR-007: Maximum six featured projects
    if (isFeatured) {
      const featuredCount = await Project.countDocuments({ isFeatured: true });
      if (featuredCount >= 6) {
        return res.status(400).json({
          success: false,
          message: 'Maximum 6 featured projects allowed on the home page. Please unmark another project first.'
        });
      }
    }

    const project = await Project.create({
      title,
      slug,
      description,
      category: category || 'Residential',
      location: location || 'Dubai, UAE',
      scope: scope || 'Full Turnkey Interior Fit-out',
      duration: duration || '10 Weeks',
      coverImage,
      gallery: gallery || [],
      beforeImages: beforeImages || [],
      afterImages: afterImages || [],
      isFeatured: !!isFeatured,
      isPublished: isPublished !== undefined ? isPublished : true,
      seo
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Project
// @route   PUT /api/v1/projects/:id
// @access  Private (Admin / Editor)
exports.updateProject = async (req, res, next) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title, { lower: true, strict: true });
    }

    if (req.body.isFeatured) {
      const existingProject = await Project.findById(req.params.id);
      if (!existingProject.isFeatured) {
        const featuredCount = await Project.countDocuments({ isFeatured: true });
        if (featuredCount >= 6) {
          return res.status(400).json({
            success: false,
            message: 'Maximum 6 featured projects allowed on the home page. Please unmark another project first.'
          });
        }
      }
    }

    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete Project
// @route   DELETE /api/v1/projects/:id
// @access  Private (Admin / Editor)
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
