process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const should = chai.should();
const server = require("../server");

const User = require("../src/routes/users/model");
const Motto = require("../src/routes/mottos/model");

chai.use(chaiHttp);

describe("Users", () => {
  beforeEach((done) => {
    User.remove({}, (error) => {
      done();
    });
  });

  // GET /users

  describe("GET /users", () => {
    it("It should GET all users.", done => {
      chai.request(server)
        .get("/users")
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  // POST /users

  describe("POST /users", () => {
    it("It should POST a user.", done => {
      let user = {
        email: "picard@enterprise.com",
        handle: "cptPicard",
        password: "risa"
      };

      chai.request(server)
        .post("/users")
        .send(user)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("handle").eql("cptPicard");
          res.body.should.have.property("email").eql("picard@enterprise.com");
          res.body.motto.should.be.a("object");
          res.body.motto.should.have.property("text");
          done();
        });
    });

    it("It should not POST a user without a password.", done => {
      let user = {
        email: "picard@enterprise.com",
        handle: "cptPicard"
      };

      chai.request(server)
        .post("/users")
        .send(user)
        .end((error, res) => {
          res.should.have.status(500);
          res.body.should.have.property("errors");
          res.body.errors.should.have.property("password");
          done();
        });
    });
  });

  // GET /users/:handle

  describe("GET /users/:handle", () => {
    it("It should GET a user with the provided handle.", done => {
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
            chai.request(server)
              .get("/users/" + user.handle)
              .end((error, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("handle").eql("cptPicard");
                res.body.should.have.property("email").eql("picard@enterprise.com");
                res.body.motto.should.be.a("object");
                res.body.motto.should.have.property("text");
                done();
              });
          });
        });
      });
    });
  });

  // PUT user

  describe("/PUT user", done => {
    it("It should UPDATE a user.", done => {
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
            let payload = {
              email: "locutis@borg.com",
              handle: "locutisOfBorg",
              password: "borg"
            };

            chai.request(server)
              .put(`/users/${user.handle}`)
              .send(payload)
              .end((error, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("email").eql("locutis@borg.com");
                res.body.should.have.property("handle").eql("locutisOfBorg");
                res.body.should.have.property("password").eql("borg");
                done();
              });
          });
        });
      });
    });
  });

  // DELETE user

  describe("/DELETE user", done => {
    it("It should delete a user.", done => {
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
            chai.request(server)
              .delete("/users/" + user.handle)
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
