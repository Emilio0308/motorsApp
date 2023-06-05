//paracrear rutas requerimos express//
const express = require('express');
const {
  findUsers,
  createUser,
  findOneUser,
  updateOneUser,
  deleteUser,
} = require('../controllers/users.controller');
const router = express.Router();

router.route('/').get(findUsers).post(createUser);
router.route('/:id').get(findOneUser).patch(updateOneUser).delete(deleteUser);

module.exports = router;
