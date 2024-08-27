// eslint-disable-next-line no-unused-vars
const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    senErrorForDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorForProd(err, res);
  }
};

const senErrorForDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    statusCode: err.statusCode,
    error: err,
    stack: err.stack,
  });
};

const sendErrorForProd = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    statusCode: err.statusCode,
  });
};

module.exports = globalError;
