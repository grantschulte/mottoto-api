const User = require("./model");
const Motto = require("../mottos/model");
const mongoose = require("mongoose");
const params = require("../../utils/params");

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
      _id: new mongoose.Types.ObjectId(),
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
  const allowed = ["email", "handle", "password"];
  const findBy = { handle: req.params.handle };
  const updateProperties = params.createUpdateObject(allowed, req.body);
  const returnNew = { new: true };

  User.findOneAndUpdate(findBy, updateProperties, returnNew,
    (error, user) => {
      if (!user) {
        let error = new Error("User not found.");
        error.status = 404;
        return next(error);
      }

      if (error) {
        return next(error);
      }

      res.json(user);
    }
  );
}

/*
 * Delete
 */

function remove(req, res, next) {
  User.remove({ handle: req.params.handle }, (error, result) => {
    if (error) {
      return next(error);
    }

    res.json(result);
  });
}

module.exports = { create, get, index, remove, update };
