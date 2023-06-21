const { generateJWT } = require('../utils/JWT');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const UsersModel = require('./../models/users.model');
const RepairModel = require('../models/repairs.model');
const bcrypt = require('bcryptjs');

exports.findUsers = catchAsync(async (req, res, next) => {
  const users = await UsersModel.findAll({
    where: {
      status: 'avialable',
      role: 'client',
    },
    attributes: ['name', 'email', 'role'],
    include: {
      model: RepairModel,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    },
  });
  return res.json({
    message: 'Hello from the get users',
    results: users.length,
    users,
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  //verificar por nombre y email si encontramos algo entonces no permitimos crear usurio 🤣//
  const findUser = await UsersModel.findOne({
    where: {
      email,
    },
  });
  if (findUser) {
    return res.status(500).json({
      message: `the user ${email} already exist`,
      status: 'error',
    });
  }
  //encriptar password//
  const salt = await bcrypt.genSalt(12);
  const encryptedPassword = await bcrypt.hash(password, salt);
  const user = await UsersModel.create({
    name,
    email,
    password: encryptedPassword,
    role,
  });
  const token = await generateJWT(user.id);
  return res.status(201).json({
    message: 'the user has been created',
    status: 'succes',
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  });
});

exports.findOneUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  return res.status(200).json({
    message: 'user found',
    stattus: 'succes',
    user,
  });
});

exports.updateOneUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { name, email } = req.body;

  await user.update({ name, email });
  return res.status(200).json({
    message: `user with ${email} has been updated`,
    stattus: 'succes',
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: 'disable' });
  return res.status(200).json({
    message: `user  ${user.name} has been deleted`,
    status: 'succes',
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await UsersModel.findOne({
    where: {
      email,
      status: 'avialable',
    },
    include: {
      model: RepairModel,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    },
  });
  if (!user) return next(new AppError('user does not exits', 404));

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('wrong password', 401));
  }

  const token = await generateJWT(user.id);

  return res.status(200).json({
    message: 'loggin',
    status: 'succes',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      repairs: user.repairs,
    },
  });
});
