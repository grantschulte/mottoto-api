const User = require("../users/model");

function index(req, res, next) {
  User.find({})
    .select("handle motto")
    .populate("motto")
    .exec((error, users) => {
      if (error) {
        return next(error);
      }

      res.json(users);
    });
}

module.exports = { index }
