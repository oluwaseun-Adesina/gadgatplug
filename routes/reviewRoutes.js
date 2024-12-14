const express = require('express');
const reviewController = require('../controllers/reviewController');
const { restrictTo, protect } = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.post('/', protect, restrictTo('user'), reviewController.createReview);

router.get('/', reviewController.getAllReviews);

router.get('/:id', reviewController.getReview);

router.patch('/:id', protect, reviewController.updateReview);

router.delete('/:id', protect, reviewController.deleteReview);

module.exports = router;
