//creamos la clase personalizada AppError  y la extendemos de Error//
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'error' : 'fail'
    this.isOperational = true

    Error.captureStackTrace(this , this.constructor)
  }
}



module.exports = AppError
