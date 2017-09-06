const User = require("./model");
const Motto = require("../mottos/model");
const mongoose = require("mongoose");
const params = require("../../utils/params");
const authUtils = require("../../utils/auth");

/*
 * Index
 */

function index(req, res, next) {
  User.find({})
    .populate("motto")
    .exec((error, users) => {
      if (error) {
        return next(error);
      }

      res.json(users);
    });
}

/*
 * Get
 */

function get(req, res, next) {
  User.findOne({ handle: req.params.handle })
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

      res.json(user);
    });
}

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
      return next(error);
    }

    let motto = new Motto({
      text: "",
      user: user._id
    });

    motto.save((error, motto) => {
      if (error) {
        return next(error);
      }

      user.motto = motto._id;

      user.save((error, user) => {
        if (error) {
          return next(error);
        }

        User.findOne(user)
          .populate("motto")
          .exec((error, user) => {
            if (error) {
              return next(error);
            }

            res.json(user);
          });
      });
    })
  });
}

/*
 * Update
 */

function update(req, res, next) {
  const allowed = ["email", "handle"];
  const options = {
    context: "query", // Needed to run uniqueValidator on update.
    new: true,
    runValidators: true // Needed to run uniqueValidator on update.
  };
  const _id = req.decoded._id;
  const updateProperties = params.createUpdateObject(allowed, req.body);

  User.findOne({ _id }, updateProperties, options, (error, user) => {
    if (error) {
      const validationError = authUtils.handleRequestErrors(error);
      return next(validationError);
    }

    user.password = req.body.password ? req.body.password : user.password;
    user.handle = req.body.handle ? req.body.handle : user.handle;
    user.email = req.body.email ? req.body.email : user.email;

    user.save((error, user) => {
      if (error) {
        return next(error);
      }

      User.findOne(user)
        .populate("motto", "_id text user")
        .exec((error, user) => {
          const cleanUser = authUtils.getCleanUser(user);
          const token = authUtils.createToken(cleanUser);
          const authUserResponse = authUtils.getAuthUserResponse(user, token);
          res.json(authUserResponse);
        });
    });
  });
}

/*
 * Delete
 */

function remove(req, res, next) {
  const handle = req.decoded.handle;

  User.remove({ handle }, (error, result) => {
    if (error) {
      return next(error);
    }

    res.json(result);
  });
}

module.exports = { create, get, index, remove, update };
