const mongoose = require("mongoose");

// Use global Promise object with mongoose.

mongoose.Promise = global.Promise;

// Connect database

const dbUri = `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`;
const db = mongoose.connect(dbUri, {
  useMongoClient: true
});

db.then((db) => {
  console.log("Database connected.");
}).catch((error) => {
  console.log("Error establishing connection to database.");
});

module.exports = db;
