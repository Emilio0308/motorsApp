//requerimos cors para poder usar la app desde el front//
const cors = require('cors');
//requerimos express/
const express = require('express');
// una vez creamos las rutas las importamos//
const userRoutes = require('./routes/users.routes');
const repairsRoutes = require('./routes/repairs.routes');
const { handleError } = require('./controllers/error.controlloer');
//guardamos express en la variable app/
const app = express();
//indicamos a app q usaremos archivos JSON//
app.use(express.json());
//LE INDICAMOS A APP USAR CORS EN SU CONFIGURACION POR DEFECTO//
app.use(cors());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/repairs', repairsRoutes);

app.use(handleError);

module.exports = app;
