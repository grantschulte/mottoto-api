/*
 * Error Handling
 */

function log(error, req, res, next) {
  console.error(error.message);
  next(error);
}

function clientErrorHandler(error, req, res, next) {
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

function globalErrorHandler(error, req, res, next) {
  res.status(error.status || 500);

  let response = error;

  switch (error.status) {
    case 404:
      response = {
        message: error.message,
        status: error.status
      };
      break;

    case 409:
      response = {
        message: error.message,
        status: error.status
      };
      break;

    case 500:
      response = error;
      break;

    default:
      response = error;
  }

  res.json(response);
}

module.exports = {
  log,
  clientErrorHandler,
  globalErrorHandler
};
