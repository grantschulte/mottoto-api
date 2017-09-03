const mongoose = require("mongoose");
const config = require("../config");
const dbUri = config.getMongoUri();

// Use global Promise object with mongoose.

mongoose.Promise = global.Promise;

// Connect database

const db = mongoose.connect(dbUri, {
  useMongoClient: true
});

db.then((db) => {
  console.log("Database connected at:", dbUri);
}).catch((error) => {
  console.log("Error establishing connection to database.");
});

module.exports = db;
