const mongoose = require("mongoose");
const params = require("../../utils/params");
const Motto = require("./model");

/*
 * Index
 */

function index(req, res, next) {
  Motto.find({}, (error, mottos) => {
    if (error) {
      return next(error);
    }

    res.json(mottos);
  })
}

/*
 * Get
 */

function get(req, res, next) {
  Motto.findOne({ _id: req.params.id }, (error, motto) => {
    if (!motto) {
      let error = new Error("Motto not found.");
      error.status = 404;
      return next(error);
    }

    if (error) {
      return next(error);
    }

    res.json(motto);
  });
}

/*
 * Create
 */

function create(req, res, next) {
  let motto = new Motto({
    text: req.body.text,
    user: req.body.user
  });

  motto.save((error, motto) => {
    if (error) {
      return next(error);
    }

    res.json(motto);
  });
}

/*
 * Update
 */

function update(req, res, next) {
  const allowed = ["text"];
  const options = { new: true };
  const user = req.decoded._id;
  const updateProperties = params.createUpdateObject(allowed, req.body);

  console.log("UPDATE MOTTO");

  if (!user) {
    let error = new Error("Not authorized to update motto.");
    error.status = 401;
    return next(error);
  }

  Motto.findOneAndUpdate({ user }, updateProperties, options)
    .select("_id text user")
    .exec((error, motto) => {
      if (!motto) {
        let error = new Error("Motto not found.");
        error.status = 404;
        return next(error);
      }

      if (error) {
        return next(error);
      }

      res.json(motto);
    }
  );
}

/*
 * Delete
 */

function remove(req, res, next) {
  Motto.remove({ _id: req.params.id }, (error, result) => {
    if (error) {
      return next(error);
    }

    res.json(result);
  });
}

module.exports = { create, get, index, remove, update };
