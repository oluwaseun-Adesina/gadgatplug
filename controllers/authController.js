const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const { promisify } = require('util');

// register user
exports.registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(new AppError('User already exists', 400));
    }

    const user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign(
      { id: user._id, userType: user.userType },
      process.env.JWT_SECRET
    );

    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

// login
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!user || !isMatch) {
      return next(new AppError('Invalid credentials', 401));
    }

    const token = jwt.sign(
      { id: user._id, userType: user.userType },
      process.env.JWT_SECRET
    );

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.validateJWT = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startswith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[0];
    }

    if (!token) {
      return next(new AppError('You are not logged in', 401));
    }

    // validate the token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await user.findById(decoded.id);

    // get current user
    if (!currentUser) {
      return next(new AppError('User no longer exists', 401));
    }

    // check if the user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError('User recently changed password! Please login again', 401)
      );
    }

    // grant access to the resource
    req.user = currentUser;
    next();
  } catch (err) {
    return next(new AppError('Invalid token', 401));
  }
};

exports.forgetPassword = async (req, res, next) => {
  // get user by email
  // create reset token
  // send reset token to user's email
};
