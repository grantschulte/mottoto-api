/*
 * Error Handling
 */

function log(error, req, res, next) {
  console.error(error.stack);
  next(error);
}

function clientErrorHandler (error, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ errors: "Request failed." });
  } else {
    next(error);
  }
}

function globalErrorHandler (error, req, res, next) {
  res.status(500).send(error);
}

module.exports = {
  log,
  clientErrorHandler,
  globalErrorHandler
};
