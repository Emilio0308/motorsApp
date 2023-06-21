exports.handleError = (err, req, res, next) => {
  const status = err.status ?? 'fail';
  const statusCode = err.statusCode ?? 500;

  return res.status(statusCode).json({
    message: err.message,
    status,
  });
};
