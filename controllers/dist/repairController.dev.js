"use strict";

var Repair = require('../models/repairModel');

var catchAsync = require('../utils/catchAsync');

var AppError = require('../utils/appError'); // create a repair


exports.createRepair = catchAsync(function _callee(req, res, next) {
  var repair;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          req.body.repairer = req.user._id;
          _context.next = 3;
          return regeneratorRuntime.awrap(Repair.create(req.body));

        case 3:
          repair = _context.sent;
          res.status(201).json({
            status: 'success',
            data: {
              repair: repair
            }
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}); // get all repairs for a user

exports.getAllRepairs = catchAsync(function _callee2(req, res, next) {
  var user, repairs;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          user = req.user._id;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Repair.find({
            repairer: user
          }));

        case 3:
          repairs = _context2.sent;
          res.status(200).json({
            status: 'success',
            data: {
              repairs: repairs
            }
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // get a repair by id user

exports.getRepair = catchAsync(function _callee3(req, res, next) {
  var user, repair;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          user = req.user;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Repair.findById(req.params.id).populate('repairer'));

        case 3:
          repair = _context3.sent;

          if (!(user.role !== 'admin' || repair.repairer !== user._id)) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", next(new AppError('You are not authorized to access this repair', 403)));

        case 6:
          if (repair) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt("return", next(new AppError('No repair found with that ID', 404)));

        case 8:
          res.status(200).json({
            status: 'success',
            data: {
              repair: repair
            }
          });

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
}); // update a repair by id user

exports.updateRepair = catchAsync(function _callee4(req, res, next) {
  var user, _req$body, gadget, description, repair;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          user = req.user;
          _req$body = req.body, gadget = _req$body.gadget, description = _req$body.description;
          _context4.next = 4;
          return regeneratorRuntime.awrap(Repair.findByIdAndUpdate(req.params.id, {
            gadget: gadget,
            description: description
          }).populate('repairer'));

        case 4:
          repair = _context4.sent;

          if (!(user.role !== 'admin' || repair.repairer !== user._id)) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt("return", next(new AppError('You are not authorized to access this repair', 403)));

        case 7:
          if (repair) {
            _context4.next = 9;
            break;
          }

          return _context4.abrupt("return", next(new AppError('No repair found with that ID', 404)));

        case 9:
          res.status(200).json({
            status: 'success',
            data: {
              repair: repair
            }
          });

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  });
}); // delete a repair by id user

exports.deleteRepair = catchAsync(function _callee5(req, res, next) {
  var user, repair;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          user = req.user;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Repair.findByIdAndDelete(req.params.id));

        case 3:
          repair = _context5.sent;

          if (!(user.role !== 'admin' || repair.repairer !== user._id)) {
            _context5.next = 6;
            break;
          }

          return _context5.abrupt("return", next(new AppError('You are not authorized to access this repair', 403)));

        case 6:
          if (repair) {
            _context5.next = 8;
            break;
          }

          return _context5.abrupt("return", next(new AppError('No repair found with that ID', 404)));

        case 8:
          res.status(204).json({
            status: 'success',
            data: null
          });

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  });
}); // admin controllers
// get all repair

exports.getAllRepairsAdmin = catchAsync(function _callee6(req, res, next) {
  var repairs;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(Repair.find());

        case 2:
          repairs = _context6.sent;
          res.status(200).json({
            status: 'success',
            data: {
              repairs: repairs
            }
          });

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  });
}); // get repair by status

exports.getRepairsByStatus = catchAsync(function _callee7(req, res, next) {
  var status, repairs;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          status = req.params.status;
          _context7.next = 3;
          return regeneratorRuntime.awrap(Repair.find({
            status: status
          }));

        case 3:
          repairs = _context7.sent;

          if (repairs.length) {
            _context7.next = 6;
            break;
          }

          return _context7.abrupt("return", next(new AppError('No repairs found with that status', 404)));

        case 6:
          res.status(200).json({
            status: 'success',
            data: {
              repairs: repairs
            }
          });

        case 7:
        case "end":
          return _context7.stop();
      }
    }
  });
}); // update repair status

exports.updateRepairStatus = catchAsync(function _callee8(req, res, next) {
  var status, repair;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          status = req.body.status;
          _context8.next = 3;
          return regeneratorRuntime.awrap(Repair.findByIdAndUpdate(req.params.id, {
            status: status
          }, {
            "new": true
          }));

        case 3:
          repair = _context8.sent;

          if (repair) {
            _context8.next = 6;
            break;
          }

          return _context8.abrupt("return", next(new AppError('No repair found with that ID', 404)));

        case 6:
          res.status(200).json({
            status: 'success',
            data: {
              repair: repair
            }
          });

        case 7:
        case "end":
          return _context8.stop();
      }
    }
  });
}); // get repair by gadget

exports.getRepairsByGadget = catchAsync(function _callee9(req, res, next) {
  var gadget, repairs;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          gadget = req.params.gadget;
          _context9.next = 3;
          return regeneratorRuntime.awrap(Repair.find({
            gadget: gadget
          }));

        case 3:
          repairs = _context9.sent;

          if (repairs.length) {
            _context9.next = 6;
            break;
          }

          return _context9.abrupt("return", next(new AppError('No repairs found for that gadget', 404)));

        case 6:
          res.status(200).json({
            status: 'success',
            data: {
              repairs: repairs
            }
          });

        case 7:
        case "end":
          return _context9.stop();
      }
    }
  });
}); // get repair by repairer

exports.getRepairsByRepairer = catchAsync(function _callee10(req, res, next) {
  var repairer, repairs;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          repairer = req.params.repairer;
          _context10.next = 3;
          return regeneratorRuntime.awrap(Repair.find({
            repairer: repairer
          }));

        case 3:
          repairs = _context10.sent;

          if (repairs.length) {
            _context10.next = 6;
            break;
          }

          return _context10.abrupt("return", next(new AppError('No repairs found for that repairer', 404)));

        case 6:
          res.status(200).json({
            status: 'success',
            data: {
              repairs: repairs
            }
          });

        case 7:
        case "end":
          return _context10.stop();
      }
    }
  });
}); // get repair by date

exports.getRepairsByDate = catchAsync(function _callee11(req, res, next) {
  var _req$params, startDate, endDate, repairs;

  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _req$params = req.params, startDate = _req$params.startDate, endDate = _req$params.endDate;
          _context11.next = 3;
          return regeneratorRuntime.awrap(Repair.find({
            createdAt: {
              $gte: new Date(startDate),
              $lte: new Date(endDate)
            }
          }));

        case 3:
          repairs = _context11.sent;

          if (repairs.length) {
            _context11.next = 6;
            break;
          }

          return _context11.abrupt("return", next(new AppError('No repairs found within that date range', 404)));

        case 6:
          res.status(200).json({
            status: 'success',
            data: {
              repairs: repairs
            }
          });

        case 7:
        case "end":
          return _context11.stop();
      }
    }
  });
});