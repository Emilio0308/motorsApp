const UsersModel = require('../models/users.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');

//se que esta parte se uso el promisify pero quise intentar con una promesa, me indica si es correcto profe//
const decodeToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_SEED, (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
};
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  //determinar si se envia el token en la req//
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  //retornar error si no hay token//
  if (!token) {
    return next(new AppError('you need to be login to this action', 403));
  }
  //decodificar el token//
  const decode = await decodeToken(token);
  //encontrar usuario del token//
  const user = await UsersModel.findOne({
    where: {
      id: decode.id,
      status: 'avialable',
    },
  });
  //agregar usuario a la req//
  if (!user) {
    return next(
      new AppError('The owner of this token it not longer available', 401)
    );
  }
  req.sesionUser = user;
  next();
});

exports.protecAccountOwner = catchAsync(async (req, res, next) => {
  const { sesionUser, user } = req;

  if (sesionUser.id !== user.id) {
    return next(new AppError('You are not the owner of this account'), 403);
  }
  next();
});

exports.restrictedRoute = (roles) => {
  return (req, res, next) => {
    const { sesionUser } = req;

    if (!roles.includes(sesionUser.role)) {
      return next(new AppError('Unauthorized to perform this action'));
    }
    next();
  };
};
