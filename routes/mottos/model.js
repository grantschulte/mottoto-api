const mongoose = require("mongoose");

const mottoSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  text: String,
  user: mongoose.Schema.Types.ObjectId
});

const Motto = mongoose.model("Motto", mottoSchema);

module.exports = Motto;
