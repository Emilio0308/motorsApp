require('dotenv').config();
const app = require('./App');
const { db } = require('./database/config');

db.authenticate()
  .then(() => console.log('Database authenticate'))
  .catch((err) => console.log(err));

db.sync()
  .then(() => console.log('Database sync'))
  .catch((err) => console.log(err));

app.listen(3001, () => {
  console.log(`Server running on port 3001! 🐱‍🐉`);
});
