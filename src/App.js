//requerimos cors para poder usar la app desde el front//
const cors = require('cors');
//requerimos express/
const express = require('express');
//librerias de seguridad//
const rateLimit = require('express-rate-limit');
const helmet = require('express-rate-limit');
const sanitizer = require('perfect-express-sanitizer');
const hpp = require('hpp');
// una vez creamos las rutas las importamos//
const userRoutes = require('./routes/users.routes');
const repairsRoutes = require('./routes/repairs.routes');
// const { handleError } = require('./controllers/error.controlloer');
const errorController = require('./controllers/error.controlloer')
const morgan = require('morgan');
//guardamos express en la variable app/
const app = express();
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: 'too many renders',
});
//indicamos a app que usaremos archivos JSON//
app.use(express.json());
//LE INDICAMOS A APP USAR CORS EN SU CONFIGURACION POR DEFECTO//
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(
  sanitizer.clean({
    xss: true,
    noSql: true,
    sql: false,
  })
);
morgan
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1', limiter);
//rutas
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/repairs', repairsRoutes);

app.use(errorController);

module.exports = app;
