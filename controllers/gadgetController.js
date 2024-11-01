const Gadget = require('../models/gadgetModel');

// create gadget
exports.createGadget = async (req, res) => {
  try {
    const gadget = new Gadget(req.body);
    await gadget.save();

    res.status(201).json({
      status: 'success',
      message: 'Gadget created successfully',
      data: {
        gadget,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

// get all gadget
exports.getAllGadgets = async (req, res) => {
  try {
    const gadgets = Gadget.find();

    res.status(200).json({
      status: 'success',
      message: 'Gadget created successfully',
      data: {
        gadgets,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

// get single gadget
exports.getGadget = async (req, res) => {
  try {
    const id = req.params.id;

    const gadget = await Gadget.findById(id);

    if (!gadget) {
      return res.status(404).json({
        status: 'fail',
        message: 'Gadget not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Gadget fetched successfully',
      data: {
        gadget,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

// upaate gadget
exports.updateGadget = async (req, res) => {
  try {
    const id = req.params.id;
    const gadget = await Gadget.findByIdAndUpdate(id, req.body, { new: true });

    if (!gadget) {
      return res.status(404).json({
        status: 'fail',
        message: 'Gadget not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Gadget updated successfully',
      data: {
        gadget,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

// delete a gadget by Id
exports.deleteGadget = async (req, res) => {
  try {
    const id = req.params.id;
    const gadget = await Gadget.findByIdAndDelete(id);
    if (!gadget) {
      return res.status(404).json({
        status: 'fail',
        message: 'Gadget not found',
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'Gadget updated successfully',
      data: {
        gadget,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};
