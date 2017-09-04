const User = require("../users/model");

function index(req, res, next) {
  User.find({})
    .select("handle motto")
    .populate("motto", "_id text user")
    .exec((error, users) => {
      if (error) {
        return next(error);
      }

      res.json(users);
    });
}

function get(req, res, next) {
  User.findOne({ handle: req.params.handle })
    .select("handle motto")
    .populate("motto", "_id text user")
    .exec((error, user) => {
      if (error) {
        return next(error);
      }

      res.json(user)
    })
}

module.exports = { index, get }
