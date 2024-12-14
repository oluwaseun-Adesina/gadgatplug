const mongoose = require('mongoose');

const reveiewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Review must belong to a user'],
  },
  gadget: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gadget',
    required: [true, 'Review must belong to a gadget'],
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating must be at most 5'],
  },
  comment: {
    type: String,
    required: [true, 'Review must have a comment'],
  },
});
