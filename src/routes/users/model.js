const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: String,
  handle: String,
  password: String,
  motto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Motto"
  }
},
{
  timestamps: {
    "createdAt": "createdAt",
    "updatedAt": "updatedAt"
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
