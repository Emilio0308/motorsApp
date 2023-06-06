const UsersModel = require('./../models/users.model');

exports.findUsers = async (req, res) => {
  const users = await UsersModel.findAll({
    where: {
      status: 'avialable',
    },
  });
  return res.json({
    message: 'Hello from the get users',
    users,
  });
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    //verificar por nombre y email si encontramos algo entonces no permitimos crear usurio 🤣//
    const findUser = await UsersModel.findOne({
      where: {
        name,
        email,
      },
    });
    if (findUser) {
      return res.status(500).json({
        message: `the user ${name}//${email} already exist`,
        status: 'error',
      });
    }
    const user = await UsersModel.create({ name, email, password, role });
    return res.status(201).json({
      message: 'the user has been created',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      stattus: 'fail',
      message: ' something went wrong',
    });
  }
};

exports.findOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UsersModel.findOne({
      where: {
        id,
        status: 'avialable',
      },
    });
    if (user) {
      return res.status(200).json({
        message: 'user found',
        stattus: 'succes',
        user,
      });
    } else {
      return res.status(404).json({
        message: `user with id: ${id} not found`,
        stattus: 'error',
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      stattus: 'fail',
      message: 'internal server error',
    });
  }
};

exports.updateOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = await UsersModel.findOne({
      status: 'avialable',
      id,
    });
    if (user) {
      await user.update({ name, email });
      return res.status(200).json({
        message: `user with id: ${id} updated`,
        stattus: 'succes',
      });
    }
    if (!user) {
      return res.status(404).json({
        message: `user with id: ${id} not found`,
        status: 'error',
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'internal server error',
      status: 'fail',
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UsersModel.findOne({
      id,
      status: 'avialable',
    });
    if (!user) {
      return res.status(404).json({
        message: `user with id: ${id} not found`,
        status: 'error',
      });
    }
    await user.update({ status: 'disable' });
    return res.status(200).json({
      message: `user with id: ${id} deleted`,
      status: 'succes',
    });
  } catch (error) {
    console.log(err);
    return res.status(500).json({
      message: 'internal server error',
      status: 'fail',
    });
  }
};
