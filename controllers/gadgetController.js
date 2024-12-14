const Gadget = require('../models/gadgetModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const axios = require('axios');

// create gadget
// Suggested code may be subject to a license. Learn more: ~LicenseLog:2730847680.
// exports.createGadget = factory.createOne(Gadget)

exports.createGadget = catchAsync(async (req, res, next) => {
  req.body.addedBy = req.user._id;

  const newGadget = await Gadget.create(req.body);

  if (!newGadget) {
    return next(new AppError('Failed to create gadget', 500));
  }

  res.status(201).json({
    status: 'success',
    data: {
      newGadget,
    },
  });
});

// get all gadget
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3855227978.
// exports.getAllGadgets = factory.getAll(Gadget)

exports.getAllGadgets = catchAsync(async (req, res, next) => {
  // i want to add pagination filter and sort without  using apifeatures using an aggregate
  const filter = {};
  if (req.params.gadgetCategory) {
    filter.category = req.params.gadgetCategory;
  }

  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;

  const gadgets = await Gadget.find(filter).skip(skip).limit(limit);

  if (!gadgets) {
    return next(new AppError('No gadgets found', 404));
  }

  res.status(200).json({
    status: 'success',
    results: gadgets.length,
    message: 'All gadgets fetched successfully',
    data: {
      gadgets,
    },
  });
});

// get single gadget
// Suggested code may be subject to a license. Learn more: ~LicenseLog:155761302.
exports.getGadget = factory.getOne(Gadget);

// upaate gadget
exports.updateGadget = factory.updateOne(Gadget);

// delete a gadget by Id
exports.deleteGadget = factory.deleteOne(Gadget);

// image upload
exports.uploadGadgetImages = catchAsync(async (req, res, next) => {
  if (!req.files.image || !req.files.image2 || !req.files.image3) {
    return next(new AppError('Please upload all images', 400));
  }
  req.body.image = req.files.image[0].filename;
  req.body.image2 = req.files.image2[0].filename;
  req.body.image3 = req.files.image3[0].filename;

  next();
});

// getAll Category
exports.getCategory = catchAsync(async (req, res, next) => {
  const category = req.params.gadgetCategory;

  const gadgets = await Gadget.find({ category });

  if (!gadgets.length) {
    return next(new AppError('No gadgets found in this category', 404));
  }

  res.status(200).json({
    status: 'success',
    results: gadgets.length,
    data: {
      gadgets,
    },
  });
});

// compare gadgets
exports.compareGadgets = catchAsync(async (req, res, next) => {
  const gadgetIds = req.body.gadgetIds;

  const gadgets = await Gadget.find({ _id: { $in: gadgetIds } });

  if (!gadgets.length) {
    return next(new AppError('No gadgets found', 404));
  }

  res.status(200).json({
    status: 'success',
    results: gadgets.length,
    message: 'Gadgets compared successfully',
    data: {
      gadgets,
    },
  });
});

// compare gadgets options
exports.compareGadgetsOptions = catchAsync(async (req, res, next) => {
  const {
    category,
    priceMin,
    priceMax,
    processor,
    ram,
    storage,
    screenSize,
    battery,
    camera,
    os,
    brand,
    sortBy,
  } = req.body;

  const { page = 1, limit = 10 } = req.query;

  // build query
  const query = {};
  if (category) query.category = category;
  if (priceMin) query.price = { $gte: priceMin };
  if (priceMax) query.price = { ...query.price, $lte: priceMax };
  if (processor) query.processor = processor;
  if (ram) query.ram = ram;
  if (storage) query.storage = storage;
  if (screenSize) query.screenSize = screenSize;
  if (battery) query.battery = battery;
  if (camera) query.camera = camera;
  if (os) query.os = os;
  if (brand) query.brand = brand;

  if (sortBy) {
    const sortByFields = sortBy.split(',').join(' ');
    query.sort = sortByFields;
  }

  const gadgets = await Gadget.find(query)
    .select('name brand category specifications price rating')
    .limit(limit)
    .skip((page - 1) * limit);

  if (!gadgets.length) {
    return next(new AppError('No gadgets found', 404));
  }

  res.status(200).j;
  son({
    status: 'success',
    results: gadgets.length,
    message: 'Gadgets compared successfully',
    data: { gadgets },
  });
});
