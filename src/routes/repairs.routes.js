const express = require('express');
const {
  findAllRepairs,
  createRepair,
  findOneRepair,
  updateRepair,
  deleteRepair,
} = require('../controllers/repairs.controller');
const router = express.Router();

router.route('/').get(findAllRepairs).post(createRepair);
router
  .route('/:id')
  .get(findOneRepair)
  .patch(updateRepair)
  .delete(deleteRepair);

module.exports = router;
