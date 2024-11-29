// routes/gadgetRoutes.js
const express = require('express');
const router = express.Router();
const {
  createGadget,
  getAllGadgets,
  getGadget,
  updateGadget,
  deleteGadget,
  uploadGadgetImages,
  getCategory
} = require('../controllers/gadgetController');

const uploadImage = require('../utils/uploadImage')
const validateGadget = require('../middlewares/gadgetValidator');


// create a gadget with image upload

// Create a gadget
router.post('/', uploadImage, uploadGadgetImages, validateGadget, createGadget);

// Get all gadgets
router.get('/', getAllGadgets);

// Get a single gadget by ID
router.get('/:id', getGadget);

// Get gadget category 
router.get('/category', getCategory)

// Update a gadget by ID
router.put('/:id', uploadImage, validateGadget, updateGadget);

// Delete a gadget by ID
router.delete('/:id', deleteGadget);

module.exports = router;
