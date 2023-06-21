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
  motorsNumber: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  status: {
    allowNull: false,
    type: DataTypes.ENUM('pending', 'complete', 'cancelled'),
    defaultValue: 'pending',
  },
  //hice mal el modelo de repairs deberia ser userId con camelCase por eso indique la llave foranea en el init model//
  userid: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
});

module.exports = Repairs;
