const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// exports.createUser = async (req, res) => {
//     try {

//     } catch (err) {
//         return res.status(500).json({
//             status: 'error',
//             message: err.message
//         })
//     }
// }

// exports.getUser = async (req, res) => {
//     try {

//     } catch (err) {
//         return res.status(500).json({
//             status: 'error',
//             message: err.message
//         })
//     }
// }

// exports.updateUser = async (req, res) => {
//     try {

//     } catch (err) {
//         return res.status(500).json({
//             status: 'error',
//             message: err.message
//         })
//     }
// }

// register user
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'User already exists',
      });
    }

    const user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign(
      { id: user._id, userType: user.userType },
      process.env.JWT_SECRET
    );

    res.status(201).json({
      status: 'success',
      data: { token: token, user: user },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

// login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid credentials',
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid credentials',
      });
    }

    const token = jwt.sign(
      { id: user._id, userType: user.userType },
      process.env.JWT_SECRET
    );

    res.status(201).json({
      status: 'success',
      data: { token: token, user: user },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};
