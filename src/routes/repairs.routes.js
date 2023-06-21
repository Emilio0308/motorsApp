const express = require('express');
//controladores/
const {
  findAllRepairs,
  createRepair,
  findOneRepair,
  updateRepair,
  deleteRepair,
} = require('../controllers/repairs.controller');
//middleware
const validationsMiddleware = require('./../middleware/validation.middleware');
const validById = require('../middleware/validById.middleware');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

//protec como middleware que proteja todas las rutas ya que debes logear para crear o modificar repairs//
router.use(authMiddleware.protect);

//validar campos antes de crear una repair//
router.route('/').post(validationsMiddleware.reparisValidations, createRepair);

//rutas protegias solo para employed//
router.use(authMiddleware.restrictedRoute('employee'));

router.route('/').get(findAllRepairs);

router
  .use('/:id', validById.repairId)
  .route('/:id')
  .get(findOneRepair)
  .patch(updateRepair)
  .delete(deleteRepair);

module.exports = router;
