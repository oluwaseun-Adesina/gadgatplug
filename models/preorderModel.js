const mongoose = require('mongoose')

const preorderSchema = new mongoose.Schema({
    gadget: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gadget',
        required: [true, 'Preorder must belong to a gadget']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Preorder must belong to a user']
    },
    quantity: {
        type: Number,
        required: [true, 'Preorder must have a quantity'],
        min: [1, 'Preorder must have at least 1 quantity']
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    isDeleted: {   
        type: Boolean,
        default: false
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        required: [true, 'Preorder must have a price']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

const Preorder = mongoose.model('Preorder', preorderSchema)

module.exports = Preorder
