const mongoose = require("mongoose");
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

userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);
module.exports = User;
