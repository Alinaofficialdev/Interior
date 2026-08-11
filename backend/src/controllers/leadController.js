const Lead = require('../models/Lead');

// @desc    Submit Consultation Request / Create Lead
// @route   POST /api/v1/leads
// @access  Public
exports.createLead = async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      phone,
      propertyType,
      service,
      location,
      message,
      preferredContactMethod,
      source,
      utmSource,
      utmMedium,
      utmCampaign
    } = req.body;

    // Validate phone number format (supports +971 or local UAE numbers)
    const cleanPhone = phone ? phone.trim() : '';
    if (!cleanPhone) {
      return res.status(400).json({ success: false, message: 'Valid UAE contact phone number is required' });
    }

    const lead = await Lead.create({
      fullName,
      email: email ? email.toLowerCase() : '',
      phone: cleanPhone,
      propertyType: propertyType || 'Villa',
      service: service || 'Full Home Renovation',
      location: location || 'Dubai',
      message: message || '',
      preferredContactMethod: preferredContactMethod || 'WhatsApp',
      status: 'New',
      source: source || 'Public Website Form',
      utmSource,
      utmMedium,
      utmCampaign
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your consultation request has been submitted successfully. Our renovation specialist will contact you shortly.',
      data: lead
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get All Leads (Paginated & Filterable)
// @route   GET /api/v1/leads
// @access  Private (Admin / Editor)
exports.getLeads = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const query = {};

    if (req.query.status) {
      query.status = req.query.status;
    }
    if (req.query.service) {
      query.service = req.query.service;
    }
    if (req.query.assignedTo) {
      query.assignedTo = req.query.assignedTo;
    }
    if (req.query.search) {
      query.$or = [
        { fullName: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } },
        { phone: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const total = await Lead.countDocuments(query);
    const leads = await Lead.find(query)
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      message: 'Leads retrieved successfully',
      data: leads,
      meta: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Lead by ID
// @route   GET /api/v1/leads/:id
// @access  Private (Admin / Editor)
exports.getLeadById = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id).populate('assignedTo', 'name email');
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }
    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Lead Status / Assignee
// @route   PUT /api/v1/leads/:id
// @access  Private (Admin / Editor)
exports.updateLead = async (req, res, next) => {
  try {
    const { status, assignedTo, assignedToName } = req.body;
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    if (status) lead.status = status;
    if (assignedTo !== undefined) lead.assignedTo = assignedTo || null;
    if (assignedToName) lead.assignedToName = assignedToName;

    await lead.save();

    res.status(200).json({
      success: true,
      message: 'Lead updated successfully',
      data: lead
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add Internal Note to Lead
// @route   POST /api/v1/leads/:id/notes
// @access  Private (Admin / Editor)
exports.addLeadNote = async (req, res, next) => {
  try {
    const { content } = req.body;
    if (!content || !content.trim()) {
      return res.status(400).json({ success: false, message: 'Note content cannot be empty' });
    }

    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    lead.notes.push({
      author: req.user ? req.user.name : 'System User',
      content: content.trim()
    });

    await lead.save();

    res.status(201).json({
      success: true,
      message: 'Note added successfully',
      data: lead
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete Lead
// @route   DELETE /api/v1/leads/:id
// @access  Private (Admin Only)
exports.deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }
    res.status(200).json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    next(error);
  }
};
