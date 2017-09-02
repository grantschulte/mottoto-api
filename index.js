const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const morgan = require("morgan");

const User = require("./routes/users/model");
const Motto = require("./routes/mottos/model");

app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/mottoto")
  .then(() => {
    console.log(`Database connected`);
  })
  .catch((error) => {
    console.log(`Database connection error`, error);
  });

app.get("/users", (req, res) => {
  User.find({})
    .populate("motto")
    .exec((error, users) => {
      if (error) {
        return next(error);
      }

      res.json(users);
    });
});

app.get("/users/:handle", (req, res) => {
  User.findOne({ handle: req.params.handle })
    .populate("motto")
    .exec((error, user) => {
      if (error) {
        return next(error);
      }

      res.json(user);
    });
});

app.post("/users", (req, res, error) => {
  let user = new User({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    handle: req.body.handle
  });

  user.save((error, user) => {
    if (error) {
      return next(error);
    }

    let motto = new Motto({
      _id: new mongoose.Types.ObjectId(),
      text: "Sup",
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
});

app.get("/mottos", (req, res, error) => {
  Motto.find({}, (error, mottos) => {
    if (error) {
      return next(error);
    }

    res.json(mottos);
  })
});

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
