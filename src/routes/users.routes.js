//paracrear rutas requerimos express//
const express = require('express');
//controllers
const {
  findUsers,
  createUser,
  findOneUser,
  updateOneUser,
  deleteUser,
  login,
} = require('../controllers/users.controller');
//middleware
const validationsMiddleware = require('./../middleware/validation.middleware');
const authMiddleware = require('../middleware/auth.middleware');
const validById = require('../middleware/validById.middleware');
const router = express.Router();

router
  .route('/')
  .get(findUsers)
  .post(validationsMiddleware.userValidation, createUser);

router.route('/login').post(validationsMiddleware.validLogin, login);

router
  .route('/:id')
  .get(validById.userId, findOneUser)
  //agregamos protect valid user y protec accountOwner para que solo el dueño de la cuenta pueda cambiar o elimar su cuenta//
  .patch(
    authMiddleware.protect,
    validById.userId,
    authMiddleware.protecAccountOwner,
    updateOneUser
  )
  .delete(
    authMiddleware.protect,
    validById.userId,
    authMiddleware.protecAccountOwner,
    deleteUser
  );

module.exports = router;
