const config = require("dotenv").config();
const db = require("./index");

const User = require("../src/routes/users/model");
const Motto = require("../src/routes/mottos/model");

db.on("connected", () => {
  seed.then((message) => {
      console.log(message);
      db.close();
    })
    .catch((error) => {
      console.log("Error seeding database.", error);
    });
});

const seed = new Promise((resolve, reject) => {
  let user = new User({
    email: "picard@enterprise.com",
    handle: "cptPicard",
    password: "password"
  });

  user.save((error, user) => {
    if (error) {
      reject(error);
    }

    let motto = new Motto({
      text: "These are the voyages of the starship Enterprise. It's continuing mission—to explore strange new worlds.",
      user: user._id
    });

    motto.save((error, user) => {
      if (error) {
        reject(error);
      }

      user.motto = motto._id;

      user.save((error, user) => {
        if (error) {
          reject(error);
        }

        resolve("Database seeding complete.");
      });
    });
  });
});
