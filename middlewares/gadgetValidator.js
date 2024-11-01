const { body, validationResult } = require('express-validator');

const validateGadget = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long'),
  body('brand').trim().notEmpty().withMessage('Brand is required'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isNumeric()
    .withMessage('Price must be a number'),
  body('image').optional().isURL().withMessage('Image must be a valid URL'),
  body('releaseDate')
    .optional()
    .isISO8601()
    .withMessage('Release date must be a valid date'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: errors.array(),
      });
    }
    next();
  },
];

module.exports = validateGadget;
