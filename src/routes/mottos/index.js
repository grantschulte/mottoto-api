const mongoose = require("mongoose");
const Motto = require("./model");

/*
 * Update
 */

function update(req, res, next) {
  Motto.findOneAndUpdate({ id: req.body.id }, (error, motto) => {
    if (error) {
      return next(error);
    }

    res.json(motto);
  })
}

module.exports = { update };
