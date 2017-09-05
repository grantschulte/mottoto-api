const mongoose = require("mongoose");

const mottoSchema = new mongoose.Schema({
  text: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const Motto = mongoose.model("Motto", mottoSchema);

module.exports = Motto;
