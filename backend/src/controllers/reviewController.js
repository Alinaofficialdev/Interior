const Review = require('../models/Review');

// Mock data for fallback when MongoDB is not connected
const mockReviews = [
  {
    _id: '1',
    customerName: 'Sarah Al-Maktoum',
    rating: 5,
    reviewText: 'Aura transformed our Palm Jumeirah villa into a masterpiece. The attention to detail and craftsmanship exceeded our expectations. Truly world-class service.',
    source: 'Google',
    project: 'Palm Jumeirah Villa',
    isPublished: true,
    isFeatured: true
  },
  {
    _id: '2',
    customerName: 'Michael Richardson',
    rating: 5,
    reviewText: 'Professional team, exceptional quality. They handled our Downtown penthouse renovation flawlessly. The German joinery work is outstanding.',
    source: 'Google',
    project: 'Downtown Penthouse',
    isPublished: true,
    isFeatured: true
  },
  {
    _id: '3',
    customerName: 'Fatima Hassan',
    rating: 5,
    reviewText: 'From design to completion, Aura delivered on every promise. Our Dubai Hills villa renovation was completed on time and within budget.',
    source: 'Trustpilot',
    project: 'Dubai Hills Villa',
    isPublished: true,
    isFeatured: true
  },
  {
    _id: '4',
    customerName: 'James Williams',
    rating: 5,
    reviewText: 'The microcement work in our master bathroom is incredible. Seamless finish and the team was professional throughout.',
    source: 'Google',
    project: 'Bathroom Renovation',
    isPublished: true,
    isFeatured: false
  },
  {
    _id: '5',
    customerName: 'Aisha Rahman',
    rating: 5,
    reviewText: 'Best interior design company in Dubai. They understood our vision for Arabian modern style and executed it perfectly.',
    source: 'Facebook',
    project: 'Villa Renovation',
    isPublished: true,
    isFeatured: false
  }
];

// @desc    Get Published Reviews & Average Rating
// @route   GET /api/v1/reviews
// @access  Public
exports.getReviews = async (req, res, next) => {
  try {
    const isPublic = !req.user;
    const query = isPublic ? { isPublished: true } : {};

    // Try to get from MongoDB first
    let reviews;
    try {
      reviews = await Review.find(query).sort({ isFeatured: -1, createdAt: -1 });
    } catch (dbError) {
      // Fallback to mock data if MongoDB fails
      console.log('Using mock reviews data');
      reviews = mockReviews.filter(r => isPublic ? r.isPublished : true);
    }

    const publishedReviews = reviews.filter(r => r.isPublished);
    const totalRating = publishedReviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = publishedReviews.length > 0 ? (totalRating / publishedReviews.length).toFixed(1) : 5.0;

    res.status(200).json({
      success: true,
      data: reviews,
      meta: {
        totalReviews: publishedReviews.length,
        averageRating: parseFloat(averageRating)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create Review
// @route   POST /api/v1/reviews
// @access  Private (Admin / Editor)
exports.createReview = async (req, res, next) => {
  try {
    const { customerName, rating, reviewText, source, externalUrl, isFeatured, isPublished } = req.body;

    const review = await Review.create({
      customerName,
      rating: rating || 5,
      reviewText,
      source: source || 'Google Review',
      externalUrl,
      isFeatured: isFeatured !== undefined ? isFeatured : true,
      isPublished: isPublished !== undefined ? isPublished : true
    });

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      data: review
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Review
// @route   PUT /api/v1/reviews/:id
// @access  Private (Admin / Editor)
exports.updateReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Review updated successfully',
      data: review
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete Review
// @route   DELETE /api/v1/reviews/:id
// @access  Private (Admin / Editor)
exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }
    res.status(200).json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    next(error);
  }
};
