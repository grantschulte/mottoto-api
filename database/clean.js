const config = require("dotenv").config();
const db = require("./index");

const User = require("../src/routes/users/model");
const Motto = require("../src/routes/mottos/model");

const clean = new Promise((resolve, reject) => {
  User.remove({}, (error) => {
    console.log("Users removed.");

    Motto.remove({}, (error) => {
      console.log("Mottos removed.");
      resolve("Database cleaned.");
    });
  });
});

db.on("connected", () => {
  clean.then((message) => {
    console.log(message);
    db.close();
  })
  .catch(e => console.log(e));
});
