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

  User.findOne({ email: user.email }, (error, foundUser) => {
    if (error) {
      reject(error);
    } else if (foundUser) {
      resolve("User already seeded.");
    } else {
      user.save((error, user) => {
        if (error) {
          reject(error);
        }

        console.log("USER----", user);

        let motto = new Motto({
          text: "These are the voyages of the starship Enterprise. It's continuing mission—to explore strange new worlds.",
          user: user._id
        });

        motto.save((error, motto) => {
          if (error) {
            reject(error);
          }

          user.motto = motto._id;

          user.save((error, user) => {
            if (error) {
              reject(error);
            } else {
              resolve("Database seeding complete.");
            }
          });
        });
      });
    }
  });
});
