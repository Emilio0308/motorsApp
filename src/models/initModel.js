const UsersModel = require('../models/users.model');
const RepairModel = require('../models/repairs.model');

const initModel = () => {
  UsersModel.hasMany(RepairModel, { foreignKey: 'userid' });
  RepairModel.belongsTo(UsersModel, { foreignKey: 'userid' });
};

module.exports = initModel