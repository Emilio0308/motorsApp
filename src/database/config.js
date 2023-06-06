//importarsequelize//
const { Sequelize } = require('sequelize');
// profe no se si lo necesita pero la contraseña de mi postgres no es root sino knd032023 😅//
const db = new Sequelize({
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: false,
});

module.exports = { db };
