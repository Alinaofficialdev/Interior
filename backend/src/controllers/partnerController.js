const Partner = require('../models/Partner');

// Mock data for fallback when MongoDB is not connected
const mockPartners = [
  {
    _id: '1',
    name: 'EMAAR',
    logo: 'https://via.placeholder.com/150',
    website: 'https://www.emaar.com',
    isActive: true,
    displayOrder: 1
  },
  {
    _id: '2',
    name: 'DAMAC',
    logo: 'https://via.placeholder.com/150',
    website: 'https://www.damacproperties.com',
    isActive: true,
    displayOrder: 2
  },
  {
    _id: '3',
    name: 'DUBAI PROPERTIES',
    logo: 'https://via.placeholder.com/150',
    website: 'https://www.dubaiproperties.com',
    isActive: true,
    displayOrder: 3
  },
  {
    _id: '4',
    name: 'NAKHEEL',
    logo: 'https://via.placeholder.com/150',
    website: 'https://www.nakheel.com',
    isActive: true,
    displayOrder: 4
  },
  {
    _id: '5',
    name: 'MERAAS',
    logo: 'https://via.placeholder.com/150',
    website: 'https://www.meraas.com',
    isActive: true,
    displayOrder: 5
  }
];

exports.getPartners = async (req, res, next) => {
  try {
    const isPublic = !req.user;
    const query = isPublic ? { isActive: true } : {};

    // Try to get from MongoDB first
    let partners;
    try {
      partners = await Partner.find(query).sort({ displayOrder: 1, createdAt: -1 });
    } catch (dbError) {
      // Fallback to mock data if MongoDB fails
      console.log('Using mock partners data');
      partners = mockPartners.filter(p => isPublic ? p.isActive : true);
    }

    res.status(200).json({ success: true, data: partners });
  } catch (error) {
    next(error);
  }
};

exports.createPartner = async (req, res, next) => {
  try {
    const partner = await Partner.create(req.body);
    res.status(201).json({ success: true, message: 'Partner created successfully', data: partner });
  } catch (error) {
    next(error);
  }
};

exports.updatePartner = async (req, res, next) => {
  try {
    const partner = await Partner.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!partner) return res.status(404).json({ success: false, message: 'Partner not found' });
    res.status(200).json({ success: true, message: 'Partner updated successfully', data: partner });
  } catch (error) {
    next(error);
  }
};

exports.deletePartner = async (req, res, next) => {
  try {
    const partner = await Partner.findByIdAndDelete(req.params.id);
    if (!partner) return res.status(404).json({ success: false, message: 'Partner not found' });
    res.status(200).json({ success: true, message: 'Partner deleted successfully' });
  } catch (error) {
    next(error);
  }
};
