const jwt = require("jsonwebtoken");

function getCleanUser(user) {
  if (!user) {
    return null;
  }

  let { email, handle, _id } = user;

  return {
    _id,
    email,
    handle
  };
}

function getAuthUserResponse(user, token) {
  if (!user || !token) {
    return null;
  }

  let {
    _id,
    email,
    handle,
    motto
  } = user;

  return {
    _id,
    email,
    handle,
    motto,
    token
  };
}

function createToken(cleanUser) {
  return jwt.sign(cleanUser, process.env.SECRET, {
    expiresIn: 60 * 60 * 24
  });
}

function checkForAccessToken(req, res, next) {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];

  if (token) {
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
      if (error) {
        return next(error);
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    let error = "No token provided.";
    error.status = 403;
    return next(error);
  }
}

module.exports = {
  checkForAccessToken,
  createToken,
  getAuthUserResponse,
  getCleanUser
};
