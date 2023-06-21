const catchAsync = require('../utils/catchAsync');
const RepairsModel = require('./../models/repairs.model');
const UsersModel = require('../models/users.model');

exports.findAllRepairs = catchAsync(async (req, res, next) => {
  const repairs = await RepairsModel.findAll({
    where: {
      status: 'pending',
    },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: {
      model: UsersModel,
      attributes: ['name', 'email', 'role'],
    },
  });
  return res.status(200).json({
    message: 'all repairs found',
    status: 'succes',
    results: repairs.length,
    repairs,
  });
});

exports.createRepair = catchAsync(async (req, res, next) => {
  const { sesionUser } = req;
  const { date, motorsNumber, description } = req.body;

  const repair = await RepairsModel.create({
    date,
    motorsNumber,
    description,
    userid: sesionUser.id,
  });

  return res.status(200).json({
    message: `repair for the user with has been created`,
    status: 'succes',
    repair: {
      status: repair.status,
      id: repair.id,
      date: repair.date,
      motorsNumber: repair.motorsNumber,
      description: repair.description,
      userid: repair.userid,
    },
  });
});

exports.findOneRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;

  return res.status(200).json({
    message: `repair con id: ${repair.id} found`,
    statstus: 'succes',
    repair,
  });
});

exports.updateRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;
  await repair.update({
    status: 'complete',
  });
  return res.status(200).json({
    message: `repair with id: ${repair.id} updated to completed`,
    status: 'succes',
  });
});

exports.deleteRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;

  repair.update({ status: 'cancelled' });
  return res.status(200).json({
    message: `repair with id: ${repair.id} has been deleted`,
    status: 'succes',
  });
});
