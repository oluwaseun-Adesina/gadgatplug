const mongoose = require('mongoose');

const GadgetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    // e.g 'smartphone', 'laptop'
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  specifications: {
    processor: String,
    ram: String,
    storage: String,
    screenSize: String,
    battery: String,
    camera: String,
    os: String,
  },
  image: {
    type: String,
  },
  releaseDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Gadget', GadgetSchema);
