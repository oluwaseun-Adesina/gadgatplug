// routes/gadgetRoutes.js
const express = require('express');
const router = express.Router();
const {
  createGadget,
  getAllGadgets,
  getGadget,
  updateGadget,
  deleteGadget,
} = require('../controllers/gadgetController');
const validateGadget = require('../middlewares/gadgetValidator');

const uploadImage = require('../middlewares/uploadImage');

// create a gadget with image upload

// Create a gadget
router.post('/', uploadImage, validateGadget, createGadget);

// Get all gadgets
router.get('/', getAllGadgets);

// Get a single gadget by ID
router.get('/:id', getGadget);

// Update a gadget by ID
router.put('/:id', uploadImage, validateGadget, updateGadget);

// Delete a gadget by ID
router.delete('/:id', deleteGadget);

module.exports = router;
