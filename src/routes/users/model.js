const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  handle: { type: String, required: true },
  password: { type: String, required: true },
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
