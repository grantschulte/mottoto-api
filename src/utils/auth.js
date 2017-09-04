const jwt = require("jsonwebtoken");

function getCleanUser(user) {
  if (!user) {
    return null;
  }

  let { email, handle } = user;

  return {
    email,
    handle
  };
}

function getAuthUserResponse(user, token) {
  if (!user || !token) {
    return null;
  }

  let {
    id,
    email,
    handle,
    motto
  } = user;

  return {
    id,
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

module.exports = { createToken, getAuthUserResponse, getCleanUser };
