process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const chaiJwt = require("chai-jwt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const server = require("../server");
const authUtils = require("../src/utils/auth");
const User = require("../src/routes/users/model");
const Motto = require("../src/routes/mottos/model");

chai.use(chaiHttp);
chai.use(chaiJwt);
const should = chai.should();
const expect = chai.expect;

describe("Users", () => {
  beforeEach((done) => {
    User.remove({}, (error) => {
      done();
    });
  });

  // PUT user

  describe("/PUT user", done => {
    it("It should update a user using a json web token.", done => {
      let user = new User({
        email: "picard@enterprise.com",
        handle: "cptPicard",
        password: "risa"
      });

      user.save((error, user) => {
        let motto = new Motto({
          text: "",
          user: user._id
        });

        motto.save((error, motto) => {
          user.motto = motto._id;

          user.save((error, user) => {
            const cleanUser = authUtils.getCleanUser(user);
            const token = authUtils.createToken(cleanUser);

            chai.request(server)
              .put(`/api/users`)
              .set("x-access-token", token)
              .send({ email: "locutis@borg.com", handle: "locutisOfBorg" })
              .end((error, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("id");
                res.body.should.have.property("email").eql("locutis@borg.com");
                res.body.should.have.property("handle").eql("locutisOfBorg");
                res.body.should.have.property("motto");
                res.body.should.have.property("token");
                expect(res.body.token).to.be.a.jwt;
                expect(res.body.token).to.be.signedWith(process.env.SECRET);
                done();
              });
          });
        });
      });
    });
  });

  // DELETE user

  describe("/DELETE user", done => {
    it("It should delete a user using a json web token.", done => {
      let user = new User({
        email: "picard@enterprise.com",
        handle: "cptPicard",
        password: "risa"
      });

      user.save((error, user) => {
        let motto = new Motto({
          text: "",
          user: user._id
        });

        motto.save((error, motto) => {
          user.motto = motto._id;

          user.save((error, user) => {
            const cleanUser = authUtils.getCleanUser(user);
            const token = authUtils.createToken(cleanUser);

            chai.request(server)
              .delete("/api/users")
              .set("x-access-token", token)
              .end((error, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property('ok').eql(1);
                res.body.should.have.property('n').eql(1);
                done();
              });
          });
        });
      });
    });
  });
});
