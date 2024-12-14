const express = require('express');
const repairController = require('../controllers/repairController');
const { restrictTo, protect } = require('../controllers/authController');

const router = express.Router();

// Create a repair request

router.post('/', repairController.createRepair);

// Get all repair requests

router.get('/', repairController.getAllRepairs);

// Get a repair request by ID

router.get('/:id', repairController.getRepair);

// Update a repair request

router.put('/:id', repairController.updateRepair);

// Delete a repair request

router.delete('/:id', repairController.deleteRepair);

// Add routes for repair status update

router.put(
  '/:id/status',
  protect,
  restrictTo('admin'),
  repairController.updateStatus
);

module.exports = router;
