process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const should = chai.should();
const server = require("../server");

const authUtils = require("../src/utils/auth");
const User = require("../src/routes/users/model");
const Motto = require("../src/routes/mottos/model");

chai.use(chaiHttp);

describe("Mottos", () => {
  beforeEach((done) => {
    User.remove({}, (error) => {
      done();
    });
  });

  describe("PUT /mottos", () => {
    it("It should update a motto.", done => {
      let user = new User({
        email: "picard@enterprise.com",
        handle: "cptPicard",
        password: "risa99"
      });

      user.save((error, user) => {
        let motto = new Motto({
          text: "Make it so.",
          user: user._id
        });

        motto.save((error, motto) => {
          user.motto = motto._id;

          user.save((error, user) => {
            const cleanUser = authUtils.getCleanUser(user);
            const token = authUtils.createToken(cleanUser);

            chai.request(server)
              .put(`/api/mottos`)
              .set("x-access-token", token)
              .send({ text: "Engage!" })
              .end((error, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("_id");
                res.body.should.have.property("text").eql("Engage!");
                res.body.should.have.property("user");
                done();
              });
          });
        });
      });
    });
  });
});
