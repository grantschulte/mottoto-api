const mongoose = require("mongoose");
const authUtils = require("../../utils/auth");
const User = require("../users/model");
const Motto = require("../mottos/model");

/*
 * Create
 */

function create(req, res, next) {
  let user = new User({
    email: req.body.email,
    handle: req.body.handle,
    password: req.body.password
  });

  user.save((error, user) => {
    if (error) {
      const validationError = authUtils.handleRequestErrors(error);
      return next(validationError);
    }

    // Create an empty motto for the user.

    let motto = new Motto({
      text: "",
      user: user._id
    });

    motto.save((error, motto) => {
      if (error) {
        return next(error);
      }

      // Add the motto to the user.

      user.motto = motto._id;

      // Save the user and populate the motto.

      user.save((error, user) => {
        if (error) {
          return next(error);
        }

        User.findOne(user)
          .populate("motto", "_id text user")
          .exec((error, user) => {
            if (error) {
              return next(error);
            } else {
              const cleanUser = authUtils.getCleanUser(user);
              const token = authUtils.createToken(cleanUser);
              const authUserResponse = authUtils.getAuthUserResponse(user, token);
              res.json(authUserResponse);
            }
          });
      });
    })
  });
}


/*
 * Login
 */

function login(req, res, next) {
  User.findOne({ email: req.body.email })
    .populate("motto", "_id text user")
    .exec((error, user) => {
      if (!user) {
        let error = new Error("The provided username and password combination failed.");
        error.status = 401;
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
          let error = new Error("The provided username and password combination failed.");
          error.status = 401;
          return next(error);
        }
      });

  });
}

/*
 * Me From Token
 */

function meFromToken(req, res, next) {
  User.findOne({ _id: req.decoded._id })
  .populate("motto", "_id text user")
  .exec((error, user) => {
    if (!user) {
      let error = new Error("User not found.");
      error.status = 401;
      return next(error);
    }

    if (error) {
      return next(error);
    }

    const cleanUser = authUtils.getCleanUser(user);
    const token = authUtils.createToken(cleanUser);
    const authUserResponse = authUtils.getAuthUserResponse(user, token);
    res.json(authUserResponse);
  });
}

module.exports = { create, login, meFromToken };
