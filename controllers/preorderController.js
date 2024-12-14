const Preorder = require('../models/preorderModel')
const Gadget = require('../models/gadgetModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const factory = require('./handlerFactory')

// exports.createPreorder = factory.createOne(Preorder)

exports.createPreorder = catchAsync(async (req, res, next) => {
    const { gadget, quantity } = req.body
    const user = req.user._id 

    const price = await Gadget.findById(gadget).select('price') * quantity

    const newPreorder = await Preorder.create({ gadget, user, quantity, price })

    res.status(201).json({
        status: 'success',
        data: { newPreorder }
    })
})

// exports.getAllPreorders = factory.getAll(Preorder)
// get all preorders for a user
exports.getAllPreorders = catchAsync(async (req, res, next) => {
    const user = req.user._id
    const preorders = await Preorder.find({ user })
    res.status(200).json({
        status: 'success',
        data: { preorders }
    })
})

// exports.getPreorder = factory.getOne(Preorder)
// get single preorder but only for those created by the user 
exports.getPreorder = catchAsync(async (req, res, next) =>{
    const user = req.user._id 

    const preorder = await Preorder.findOne({ user, _id: req.params.id })

    if (!preorder) {
        return next(new AppError('No preorder found with that ID', 404))
    }

    res.status(200).json({
        status: 'success',
        data: { preorder }
    })
})

// exports.updatePreorder = factory.updateOne(Preorder)
// update a preorder but only for those created by the user 
exports.updatePreorder = catchAsync(async (req, res, next) => {
    const user = req.user._id 
    const { quantity, gadget } = req.body

    const price = await Gadget.findById(gadget).select('price') * quantity

    const preorder = await Preorder.findOneAndUpdate({ user, _id: req.params.id }, { quantity, price }, { new: true })

    res.status(200).json({
        status: 'success',
        data: { preorder }
    })

})

// update the status of a preorder admin 
exports.updatePreorderStatus = catchAsync(async (req, res, next) => {

    const { status } = req.body

    const user = req.user

    if (!user.role === 'admin') {
        return next(new AppError('You are not authorized to update the status of a preorder', 403))
    }

    const preorder = await Preorder.findOneAndUpdate({ _id: req.params.id }, { status }, { new: true })

    res.status(200).json({
        status: 'success',
        data: { preorder }
    })
})  

// exports.deletePreorder = factory.deleteOne(Preorder)
// delete a preorder but only for those created by the user 
exports.deletePreorder = catchAsync(async (req, res, next) => {
    const user = req.user._id 
    await Preorder.findOneAndDelete({ user, _id: req.params.id })
    res.status(204).json({
        status: 'success'
    })
})

// admin routes
exports.getAllPreordersAdmin = factory.getAll(Preorder)

exports.getPreorderAdmin = factory.getOne(Preorder)

exports.deletePreorderAdmin = factory.deleteOne(Preorder)


