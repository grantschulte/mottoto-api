const mongoose = require("mongoose");

const mottoSchema = new mongoose.Schema({
  text: String,
  user: mongoose.Schema.Types.ObjectId
});

const Motto = mongoose.model("Motto", mottoSchema);

module.exports = Motto;
