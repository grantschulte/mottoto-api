const mongoose = require("mongoose");
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
 * Update
 */

function update(req, res, next) {
  const findBy = { id: req.body.id };
  const updateProperties = { text: req.body.text };
  const returnNew = { new: true };

  Motto.findOneAndUpdate(findBy, updateProperties, returnNew,
    (error, motto) => {
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

// function remove(req, res, next) {
//   Motto.remove({ id: req.params.id }, (error, result) => {
//     if (error) {
//       return next(error);
//     }
//
//     res.json(result);
//   });
// }

module.exports = { index, update };
