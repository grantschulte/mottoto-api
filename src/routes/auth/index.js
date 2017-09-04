const User = require("../users/model");
const authUtils = require("../../utils/auth");

/*
 * Login
 */

function login(req, res, next) {
  User.findOne({ email: req.body.email })
    .populate("motto")
    .exec((error, user) => {
      if (!user) {
        let error = new Error("User not found.");
        error.status = 404;
        return next(error);
      }

      if (error) {
        return next(error);
      }

      user.comparePassword(req.body.password, (error, isMatch) => {
        if (isMatch && !error) {
          const cleanUser = authUtils.getCleanUser(user);
          const token = authUtils.createToken(cleanUser);
          const authUserResponse = authUtils.getAuthUserResponse(user, token);
          res.json(authUserResponse);
        } else {
          let error = new Error("Username or password does not match.");
          error.status = 401;
          return next(error);
        }
      });

  });
}

/*
 * Logout
 */

function logout(req, res, next) {

}

/*
 * Refresh
 */

function refresh(req, res, next) {

}

module.exports = { login, logout, refresh };
