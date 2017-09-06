const mongoose = require("mongoose");
const bcrypt = require("bcrypt");''
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  handle: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  motto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Motto"
  }
}, {
  timestamps: {
    "createdAt": "createdAt",
    "updatedAt": "updatedAt"
  }
});

// Encrypt password before saving

userSchema.pre("save", function(next) {
  let user = this;

  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(10, (error, salt) => {
    if (error) {
      return next(error);
    }

    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) {
        return next();
      }

      user.password = hash;
      next();
    });
  });
});

userSchema.pre("update", function(next) {
  let user = this;

  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(10, (error, salt) => {
    if (error) {
      return next(error);
    }

    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) {
        return next();
      }

      user.password = hash;
      next();
    });
  });
});

// function hashPassword(next) {
//
// }

// Compare password

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(error, isMatch) {
    if (error) {
      return cb(error);
    }
    cb(null, isMatch);
  });
};

userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);
module.exports = User;
