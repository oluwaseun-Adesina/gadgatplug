const Repair = require('../models/repairModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// create a repair

exports.createRepair = catchAsync(async (req, res, next) => {
  req.body.user = req.user._id;
  const repair = await Repair.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { repair },
  });
});

// get all repairs for a user

exports.getAllRepairs = catchAsync(async (req, res, next) => {
  const user = req.user._id;
  const repairs = await Repair.find({ user: user });

  res.status(200).json({
    status: 'success',
    data: { repairs },
  });
});

// get a repair by id user
exports.getRepair = catchAsync(async (req, res, next) => {
  const user = req.user;

  const repair = await Repair.findById(req.params.id).populate('repairer');

  if (user.role !== 'admin' || repair.user !== user._id) {
    return next(
      new AppError('You are not authorized to access this repair', 403)
    );
  }
  if (!repair) {
    return next(new AppError('No repair found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: { repair },
  });
});

// update a repair by id user

exports.updateRepair = catchAsync(async (req, res, next) => {
  const user = req.user;

  const { gadget, description } = req.body;

  const repair = await Repair.findById(req.params.id).populate('user');

  if (user.role !== 'admin' || repair.user !== user._id) {
    return next(
      new AppError('You are not authorized to access this repair', 403)
    );
  }
  if (!repair) {
    return next(new AppError('No repair found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { repair },
  });
});

// delete a repair by id user

exports.deleteRepair = catchAsync(async (req, res, next) => {
  const user = req.user;

  const repair = await Repair.findByIdAndDelete(req.params.id);

  if (user.role !== 'admin' || repair.user !== user._id) {
    return next(
      new AppError('You are not authorized to access this repair', 403)
    );
  }
  if (!repair) {
    return next(new AppError('No repair found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// admin controllers
// get all repair

exports.getAllRepairsAdmin = catchAsync(async (req, res, next) => {
  const repairs = await Repair.find();

  res.status(200).json({
    status: 'success',
    data: { repairs },
  });
});

// get repair by status

exports.getRepairsByStatus = catchAsync(async (req, res, next) => {
  const { status } = req.params;

  const repairs = await Repair.find({ status });

  if (!repairs.length) {
    return next(new AppError('No repairs found with that status', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { repairs },
  });
});

// update repair status

exports.updateRepairStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;

  const repair = await Repair.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  if (!repair) {
    return next(new AppError('No repair found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { repair },
  });
});

// get repair by gadget

exports.getRepairsByGadget = catchAsync(async (req, res, next) => {
  const { gadget } = req.params;

  const repairs = await Repair.find({ gadget });

  if (!repairs.length) {
    return next(new AppError('No repairs found for that gadget', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { repairs },
  });
});

// get repair by repairer

exports.getRepairsByRepairer = catchAsync(async (req, res, next) => {
  const repairer = req.params.repairer;

  const repairs = await Repair.find({ repairer });

  if (!repairs.length) {
    return next(new AppError('No repairs found for that repairer', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { repairs },
  });
});

// get repair by date

exports.getRepairsByDate = catchAsync(async (req, res, next) => {
  const { startDate, endDate } = req.params;

  const repairs = await Repair.find({
    createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
  });

  if (!repairs.length) {
    return next(new AppError('No repairs found within that date range', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { repairs },
  });
});
