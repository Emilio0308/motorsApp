const JWT = require('jsonwebtoken');

exports.generateJWT = (id) => {
  return new Promise((response, reject) => {
    const payload = { id };

    JWT.sign(
      payload,
      process.env.JWT_SECRET_SEED,
      {
        expiresIn: process.env.JWT_EXPIRED,
      },
      function (err, token) {
        if (err) {
          reject(err);
        }
        response(token);
      }
    );
  });
};
