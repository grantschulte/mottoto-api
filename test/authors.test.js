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

  // GET /authors

  describe("GET /authors", () => {
    it("It should GET all authors.", done => {
      chai.request(server)
        .get("/authors")
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  // GET /authors/:handle

  describe("GET /authors/:handle", () => {
    it("It should GET an author by property handle.", done => {
      let user = new User({
        email: "picard@enterprise.com",
        handle: "cptPicard",
        password: "risa99"
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
              .get(`/authors/${user.handle}`)
              .end((error, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("_id");
                res.body.should.have.property("handle");
                res.body.should.have.property("motto");
                res.body.motto.should.have.property("_id");
                res.body.motto.should.have.property("text").eql("");
                res.body.motto.should.have.property("user").eql(user.id);
                done();
              });
          });
        });
      });
    });
  });
});
