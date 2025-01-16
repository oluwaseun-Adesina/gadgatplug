// routes/gadgetRoutes.js
const express = require('express');
const router = express.Router();
const {
  createGadget,
  getAllGadgets,
  getGadget,
  updateGadget,
  deleteGadget,
  // uploadGadgetImages,
  getCategory,
  compareGadgets,
  compareGadgetsOptions,
  compareGadgetsAI,
} = require('../controllers/gadgetController');

const { protect } = require('../controllers/authController');

const upload = require('../utils/uploadImage');
const validateGadget = require('../middlewares/gadgetValidator');

// create a gadget with image upload
router.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});
// Create a gadget
// router.post('/', uploadImage, uploadGadgetImages, validateGadget, createGadget); commenting this out for now to test with image upload

router.post(
  '/',
  protect,
  validateGadget,
  upload.array('images', 5),
  createGadget
);

// Get all gadgets
router.get('/', getAllGadgets);
// compare gadgets
router.post('/compare', compareGadgets);

// compare gadgets options
router.post('/compare/options', compareGadgetsOptions);

// Get a single gadget by ID
router.get('/:id', getGadget);

// Update a gadget by ID
router.patch('/:id', protect, validateGadget, updateGadget);
// Get gadget category
router.get('/category/:gadgetCategory', getCategory);

// Delete a gadget by ID
router.delete('/:id', protect, deleteGadget);

// Test pust image
// router.post('/:id/image', uploadImage, uploadGadgetImages, validateGadget, updateGadget);

module.exports = router;
