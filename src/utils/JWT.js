const JWT = require('jsonwebtoken');

exports.generateJWT = (id) => {
  //generamos una promesa para q el codigo sea asincrono//
  return new Promise((response, reject) => {
    const payload = { id };
    // generamos el token
    JWT.sign(
      payload,
      process.env.JWT_SECRET_SEED,
      {
        expiresIn: process.env.JWT_EXPIRED,
      },
      function (err, token) {
        //verificar error y retornar
        if (err) {
          reject(err);
        }
        response(token);
      }
    );
  });
};
