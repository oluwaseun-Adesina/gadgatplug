const express = require('express');
const router = express.Router();
const {
  validateUserLogin,
  validateUserRegistration,
} = require('../middlewares/userValidator');
const { registerUser, loginUser } = require('../controllers/authController');

// register user
router.post('/register', validateUserRegistration, registerUser);

// login
router.post('/login', validateUserLogin, loginUser);

module.exports = router;
