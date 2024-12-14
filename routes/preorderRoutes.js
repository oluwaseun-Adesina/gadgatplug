const express = require('express')
const router = express.Router()
const {
    createPreorder,
    getAllPreorders,
    getPreorder,
    updatePreorder,
    deletePreorder,
    updatePreorderStatus
} = require('../controllers/preorderController')

const { protect, restrictTo } = require('../controllers/authController')

router.post('/', protect, restrictTo('user'), createPreorder)

router.get('/', protect, getAllPreorders)

router.get('/:id', protect, getPreorder)

router.patch('/:id', protect, updatePreorder)

router.delete('/:id', protect, deletePreorder)

// admin routes
router.patch('/:id/status', protect, restrictTo('admin'), updatePreorderStatus)

module.exports = router

