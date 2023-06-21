require('dotenv').config();
const app = require('./App');
const { db } = require('./database/config');
const initModel = require('./models/initModel');

db.authenticate()
  .then(() => console.log('Database authenticate'))
  .catch((err) => console.log(err));
//funcion q relaciona las tablas
initModel();

db.sync()
  .then(() => console.log('Database sync'))
  .catch((err) => console.log(err));

app.listen(3001, () => {
  console.log(`Server running on port 3001! 🐱‍🐉`);
});
