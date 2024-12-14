const mongoose = require('mongoose');

const repairSchema = new mongoose.Schema({
  gadget: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gadget',
    required: [true, 'Repair must belong to a gadget'],
  },
  repairer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Repair must belong to a user'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [10, 'Description must have at least 10 characters'],
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    enum: ['pending', 'ongoing', 'completed', 'cancelled'],
    default: 'pending',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Repair', repairSchema);
