"use strict";

var express = require('express');

var repairController = require('repair-controller');

var _require = require('../controllers/authController'),
    restrictTo = _require.restrictTo,
    protect = _require.protect;

var router = express.Router(); // Create a repair request

router.post('/', repairController.createRepair); // Get all repair requests

router.get('/', repairController.getAllRepairs); // Get a repair request by ID

router.get('/:id', repairController.getRepair); // Update a repair request

router.put('/:id', repairController.updateRepair); // Delete a repair request

router["delete"]('/:id', repairController["delete"]);
module.exports = router; // Add routes for repair status update

router.put('/:id/status', protect, restrictTo('admin'), repairController.updateStatus);