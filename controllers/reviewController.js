const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// create a review

// Suggested code may be subject to a license. Learn more: ~LicenseLog:2730847680.
// exports.createReview = factory.createOne(Review)

exports.createReview = catchAsync(async (req, res, next) => {
  req.body.user = req.user._id;
  req.body.gadget = req.params.gadgetId;

  const review = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: review,
  });
});

// get all reviews for a specific gadget
exports.getReviewByGagdget = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({ gadget: req.params.gadgetId }).populate(
    'user',
    'name'
  );
  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: reviews,
  });
});

// get a single review by id
exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate('user', 'name');
  if (!review) {
    return next(new AppError('No review found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: review,
  });
});

// update a review
exports.updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  const user = req.user;
  if (review.user !== user._id) {
    return next(
      new AppError('You are not authorized to update this review', 403)
    );
  }
  if (req.body.rating) {
    review.rating = req.body.rating;
  }
  if (req.body.comment) {
    review.comment = req.body.comment;
  }
  await review.save();

  res.status(200).json({
    status: 'success',
    data: review,
  });
});

// delete a review

exports.deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  const user = req.user;
  if (review.user !== user._id) {
    return next(
      new AppError('You are not authorized to delete this review', 403)
    );
  }
  await review.remove();
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
