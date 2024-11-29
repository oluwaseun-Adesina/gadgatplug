const Gadget = require('../models/gadgetModel');
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const factory = require('./handlerFactory')

// create gadget
// Suggested code may be subject to a license. Learn more: ~LicenseLog:2730847680.
exports.createGadget = factory.createOne(Gadget)

// get all gadget
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3855227978.
exports.getAllGadgets = factory.getAll(Gadget)

// get single gadget
// Suggested code may be subject to a license. Learn more: ~LicenseLog:155761302.
exports.getGadget = factory.getOne(Gadget)

// upaate gadget
exports.updateGadget = factory.updateOne(Gadget)

// delete a gadget by Id
exports.deleteGadget = factory.deleteOne(Gadget)

// image upload
exports.uploadGadgetImages = catchAsync(async (req, res, next) => {
    if (!req.files.image || !req.files.image2 || !req.files.image3) {
        return next(new AppError('Please upload all images', 400))
    }
    req.body.image = req.files.image[0].filename
    req.body.image2 = req.files.image2[0].filename
    req.body.image3 = req.files.image3[0].filename
    
    next()
})

// getAll Category
exports.getCategory = catchAsync(async (req, res, next) => {
    const category = await Gadget.find().distinct('category')
    res.status(200).json({
        status: 'success',
        data: {
            category,
        },
    })
})
