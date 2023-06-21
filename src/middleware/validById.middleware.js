const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const UsersModel = require('../models/users.model');
const RepairModel = require('./../models/repairs.model');

exports.userId = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await UsersModel.findOne({
    where: {
      id,
      status: 'avialable',
    },
    attributes: ['id', 'name', 'email', 'role'],
    include: {
      model: RepairModel,
    },
  });
  if (!user) {
    return next(new AppError('user not found', 404));
  }
  req.user = user;

  next();
});

exports.repairId = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  //validamos si existe solo por id//
  const repair = await RepairModel.findOne({
    where: {
      id,
    },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: {
      model: UsersModel,
      attributes: ['name', 'email', 'role'],
    },
  });
  if (!repair) {
    return next(new AppError('repair not found', 404));
  }
  //si el estado es diferente de pending devolvemos error esto para poder cubrir la situacion donde se intente cancelar algo ya completado//
  if (repair.status !== 'pending') {
    return next(
      new AppError(
        `the order has already been ${repair.status}, it cannot be modified`
      )
    );
  }
  req.repair = repair;

  next();
});
