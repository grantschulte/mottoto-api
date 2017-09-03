const mongoose = require("mongoose");
const config = require("../config");
const dbUri = config.getMongoUri();

// Use global Promise object with mongoose.

mongoose.Promise = global.Promise;

// Connect database

const db = mongoose.connect(dbUri, {
  useMongoClient: true
});

db.on("connected", () => {
  console.log("Database connected at ", dbUri);
});

db.on("disconnected", () => {
  console.log("Database connection closed.");
});

db.on("error", () => {
  console.log("Database connection error.");
});

module.exports = db;
