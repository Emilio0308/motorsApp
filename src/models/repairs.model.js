const { DataTypes } = require('sequelize');

const { db } = require('./../database/config');

const Repairs = db.define('repairs', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  date: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  status: {
    allowNull: false,
    type: DataTypes.ENUM('pending', 'complete', 'cancelled'),
    defaultValue: 'pending',
  },
  userid: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
});

module.exports = Repairs;
