process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const should = chai.should();
const server = require("../server");

const User = require("../src/routes/users/model");

chai.use(chaiHttp);

describe("Users", () => {
  beforeEach((done) => {
    User.remove({}, (error) => {
      done();
    });
  });

  // GET /users

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
});
