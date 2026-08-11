const Quote = require('../models/Quote');
const Lead = require('../models/Lead');

// Helper to generate Q-YYYY-NNNN
const generateQuoteNumber = async () => {
  const year = new Date().getFullYear();
  const count = await Quote.countDocuments();
  const nextNum = (count + 1).toString().padStart(4, '0');
  return `Q-${year}-${nextNum}`;
};

// @desc    Create New Quotation
// @route   POST /api/v1/quotes
// @access  Private (Admin Only)
exports.createQuote = async (req, res, next) => {
  try {
    const { leadId, leadName, leadEmail, items, discount, taxRate, currency, validUntil } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Quotation must include at least one item' });
    }

    // Calculate line totals & subtotal
    const processedItems = items.map(item => {
      const qty = item.quantity || 1;
      const price = item.unitPrice || 0;
      return {
        description: item.description,
        category: item.category || 'Fit-out',
        quantity: qty,
        unit: item.unit || 1,
        unitPrice: price,
        lineTotal: qty * price
      };
    });

    const subtotal = processedItems.reduce((acc, item) => acc + item.lineTotal, 0);
    const discountVal = discount || 0;
    const taxableAmount = Math.max(0, subtotal - discountVal);
    const vatRate = taxRate !== undefined ? taxRate : 0.05; // 5% UAE VAT
    const taxVal = taxableAmount * vatRate;
    const grandTotal = taxableAmount + taxVal;

    const quoteNumber = await generateQuoteNumber();

    let leadRef = leadId;
    let targetLeadName = leadName;
    let targetLeadEmail = leadEmail;

    if (leadId) {
      const lead = await Lead.findById(leadId);
      if (lead) {
        targetLeadName = lead.fullName;
        targetLeadEmail = lead.email;
        lead.status = 'Quoted';
        await lead.save();
      }
    }

    const quote = await Quote.create({
      quoteNumber,
      lead: leadRef || null,
      leadName: targetLeadName || 'Valued Client',
      leadEmail: targetLeadEmail || '',
      items: processedItems,
      subtotal,
      discount: discountVal,
      tax: taxVal,
      grandTotal,
      currency: currency || 'AED',
      status: 'Draft',
      validUntil: validUntil || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days valid
      createdBy: req.user ? req.user._id : null
    });

    res.status(201).json({
      success: true,
      message: `Quotation ${quoteNumber} generated successfully`,
      data: quote
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get All Quotes
// @route   GET /api/v1/quotes
// @access  Private (Admin Only)
exports.getQuotes = async (req, res, next) => {
  try {
    const quotes = await Quote.find()
      .populate('lead', 'fullName email phone')
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: quotes
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Quote by ID
// @route   GET /api/v1/quotes/:id
// @access  Private (Admin / Client)
exports.getQuoteById = async (req, res, next) => {
  try {
    const quote = await Quote.findById(req.params.id)
      .populate('lead')
      .populate('createdBy', 'name email');

    if (!quote) {
      return res.status(404).json({ success: false, message: 'Quotation not found' });
    }

    res.status(200).json({ success: true, data: quote });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Quote Status (Draft, Sent, Accepted, Rejected)
// @route   PUT /api/v1/quotes/:id/status
// @access  Private
exports.updateQuoteStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({ success: false, message: 'Quotation not found' });
    }

    quote.status = status;
    await quote.save();

    res.status(200).json({
      success: true,
      message: `Quote status updated to ${status}`,
      data: quote
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete Quote
// @route   DELETE /api/v1/quotes/:id
// @access  Private (Admin Only)
exports.deleteQuote = async (req, res, next) => {
  try {
    const quote = await Quote.findByIdAndDelete(req.params.id);
    if (!quote) {
      return res.status(404).json({ success: false, message: 'Quotation not found' });
    }
    res.status(200).json({ success: true, message: 'Quotation deleted successfully' });
  } catch (error) {
    next(error);
  }
};
