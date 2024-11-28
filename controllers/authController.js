const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync')
const jwt = require('jsonwebtoken')
const AppError = require('../utils/appError')
const sendEmail = require('../utils/email')
const { promisify } = require('util')
const crypto = require('crypto')

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id)

    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    }

    if (process.env.NODE_ENV === 'production') {
        cookieOptions.secure = true
    }

    res.cookie('jwt', token, cookieOptions)

    // remove password from output
    user.password = undefined

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user,
        },
    })
}
exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        role: req.body.role || 'user',
    })

    createSendToken(newUser, 201, res)
})

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body

    // 1 check if email and passsowrd exist
    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400))
    }

    // check if user exist and password is correct
    const user = await User.findOne({ email }).select('+password')

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401))
    }
    // if everything is ok, send token to client
    createSendToken(user, 200, res)
})

exports.protect = catchAsync(async (req, res, next) => {
    // get the token and check if it's there
    let token
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
        return next(
            new AppError(
                'You are not logged in!, please login to get access',
                401
            )
        )
    }
    // validate the token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    // check if the user still exist
    const currentUser = await User.findById(decoded.id)

    if (!currentUser) {
        return next(
            new AppError(
                'The user belonging to this token does no longer exist',
                401
            )
        )
    }
    // check if the user changed password after the token was issued
    if (currentUser.changePasswordAfter(decoded.iat)) {
        return next(
            new AppError(
                'User recently changed password! Please login again',
                401
            )
        )
    }

    // grant access to protected route
    req.user = currentUser
    // res.locals.user = freshUser
    next()
})

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError(
                    'You do not have permission to perform this action',
                    403
                )
            )
        }
        next()
    }
}

exports.forgetPassword = catchAsync(async (req, res, next) => {
    // GET USER BASED ON POSED EMAIL
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return next(
            new AppError('There is no user with the email address', 404)
        )
    }
    // CREATE RESET TOKEN
    const resetToken = user.createPasswordResetToken()
    await user.save({ validateBeforeSave: false })

    // SEND RESET LINK TO USER WITH TOKEN
    const resetURL = `${req.protocol}://${req.get(
        'host'
    )}/api/v1/users/resetPassword/${resetToken}`

    const message = `Forget your password? Submit a PATCH request with your new password and PasswordConfirm to: ${resetURL}. \N IF you didn't forget you password, please ignore this email`

    try {
        await sendEmail({
            email: user.email,
            subject: 'Your password reset token (valid for 10 min)',
            message,
        })
        res.status(200).json({
            status: 'success',
            message: 'Token sent to email',
        })
    } catch (err) {
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined
        await user.save({ validateBeforeSave: false })

        return next(
            new AppError('Failed to send email. Please try again later', 500)
        )
    }
})

exports.resetPassword = catchAsync(async (req, res, next) => {
    // get user based on the token
    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex')

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpiresAt: { $gt: Date.now() },
    })
    // IF TOken has not expire then there user, set the new password
    if (!user) {
        return next(new AppError('Token is invalid or has expired', 400))
    }

    user.password = req.body.password
    user.passwordConfirm = req.body.passwordConfirm
    user.passwordResetToken = undefined
    user.passwordResetExpiresAt = undefined
    await user.save()

    // update user password and remove reset token and expires field
    // login user with
    createSendToken(user, 200, res)
})

exports.updatePassword = catchAsync(async (req, res, next) => {
    // get the user from collection
    const user = await User.findById(req.user.id).select('+password')

    // 2 check if the posted current password is correct
    if (
        !(await user.correctPassword(req.body.currentPassword, user.password))
    ) {
        return next(new AppError('Incorrect current password', 401))
    }

    // 3 if the current password is correct, update the password
    user.password = req.body.password
    user.passwordConfirm = req.body.passwordConfirm
    await user.save()

    // 4 login the user and send jwt
    createSendToken(user, 200, res)
})
