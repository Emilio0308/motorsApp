const Repairs = require('./../models/repairs.model');

exports.findAllRepairs = async (req, res) => {
  const repairs = await Repairs.findAll({
    where: {
      status: 'pending',
    },
  });
  return res.status(200).json({
    message: 'all repairs found',
    status: 'succes',
    repairs,
  });
};

exports.createRepair = async (req, res) => {
  try {
    const { date, userid } = req.body;
    const repair = await Repairs.create({ date, userid });
    return res.status(200).json({
      message: `repair for the user with id: ${userid} has been created`,
      status: 'succes',
      repair,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'internal server error',
      status: 'fail',
    });
  }
};
exports.findOneRepair = async (req, res) => {
  try {
    const { id } = req.params;
    const repair = await Repairs.findOne({
      where: {
        id,
        status: 'pending',
      },
    });
    return res.status(200).json({
      message: `repair con id: ${id} found`,
      statstus: 'succes',
      repair,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'internal server error',
      status: 'fail',
    });
  }
};

exports.updateRepair = async (req, res) => {
  try {
    const { id } = req.params;
    const repair = await Repairs.findOne({
      where: {
        id,
        status: 'pending',
      },
    });
    if (!repair) {
      return res.status(404).json({
        message: `repair with id ${id} not found`,
        status: ' error',
      });
    }
    await repair.update({
      status: 'complete',
    });
    return res.status(200).json({
      message: `repair with id: ${id} updated`,
      status: 'succes',
      repair,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'internal server error',
      status: 'fail',
    });
  }
};

exports.deleteRepair = async (req, res) => {
  const { id } = req.params;
  const repair = await Repairs.findOne({
    where: {
      id,
    },
  });
  // para aegurarnos q la tarea no esta completa no se si usar dataValues sea correcto pero fue lo q se me ocurrio xD 🤡//
  if (repair.dataValues.status === 'complete') {
    return res.status(500).json({
      message: `the repair with id ${id} is completed cannot be canceled`,
      status: 'error',
    });
  }
  if (!repair) {
    return res.status(404).json({
      message: `repair with id: ${id} not found`,
      status: 'error',
    });
  }
  repair.update({ status: 'cancelled' });
  return res.status(200).json({
    message: `repair with id: ${id} deleted`,
    status: 'succes',
  });
};
