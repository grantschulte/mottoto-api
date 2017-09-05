const config = require("dotenv").config();
const db = require("./index");

const User = require("../src/routes/users/model");
const Motto = require("../src/routes/mottos/model");

db.on("connected", () => {
  seed.then((message, user) => {
      console.log(message, user);
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

    console.log("USER ID", user._id);

    motto.save((error, motto) => {
      if (error) {
        reject(error);
      }

      user.motto = motto._id;

      console.log("MOTTO ID", motto._id);

      user.save((error, user) => {
        console.log("USA", user);

        if (error) {
          reject(error);
        } else {
          resolve("Database seeding complete.", user);
        }
      });
    });
  });
});
