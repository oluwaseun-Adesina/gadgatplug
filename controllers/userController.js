const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const factory = require('./handlerFactory')

const filterObj = (obj, ...allowedFields) => {
    const filteredObj = {}
    Object.keys(obj).forEach((key) => {
        if (allowedFields.includes(key)) {
            filteredObj[key] = obj[key]
        }
    })
    return filteredObj
}

exports.getMe = catchAsync(async (req, res, next) => {
    req.params.id = req.user.id
    next()
})

exports.updateMe = catchAsync(async (req, res, next) => {
    // 1 Creaete error if user tries to update password
    if (req.body.password || req.body.passwordConfirm) {
        return next(
            new AppError(
                'This route is not for pasword updates. Please use /updateMyPassword',
                400
            )
        )
    }

    // filter data
    const filteredBody = filterObj(req.body, 'name', 'password')
    // update user document

    const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        filteredBody,
        {
            new: true,
            runValidators: true,
        }
    )

    res.status(200).json({
        status: 'success',
        message: 'User updated successfully',
        data: {
            user: updatedUser,
        },
    })
})

exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false })

    res.status(204).json({
        status: 'success',
        message: 'User deleted successfully',
        data: null,
    })

    // log out user
})
exports.createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined! Please use /signup instead.',
    })
}

exports.getAllUsers = factory.getAll(User)

exports.getUser = factory.getOne(User)

exports.updateUser = factory.updateOne(User)

exports.deleteUser = factory.deleteOne(User)
