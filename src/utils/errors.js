/*
 * Error Handling
 */

function log(error, req, res, next) {
  console.error(error.message);
  next(error);
}

function clientErrorHandler (error, req, res, next) {
  if (req.xhr) {
    res.status(error.status || 500);
    res.json({
      status: error.status,
      message: "Request Failed."
    });
  } else {
    next(error);
  }
}

function globalErrorHandler (error, req, res, next) {
  res.status(error.status || 500);

  if (error.status === 404) {
    res.json({
      message: error.message,
      status: error.status
    });
  } else {
    res.json(error);
  }
}

module.exports = {
  log,
  clientErrorHandler,
  globalErrorHandler
};
