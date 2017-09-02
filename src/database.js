const mongoose = require("mongoose");

// Use global Promise object with mongoose.

mongoose.Promise = global.Promise;

// Connect database

let dbUri = process.env.NODE_ENV === "test"
  ? `mongodb://localhost/mottoto-test`
  : `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`;

const db = mongoose.connect(dbUri, {
  useMongoClient: true
});

db.then((db) => {
  console.log("Database connected.", dbUri);
}).catch((error) => {
  console.log("Error establishing connection to database.");
});

module.exports = db;
