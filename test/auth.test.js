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

describe("Auth", () => {
  beforeEach((done) => {
    User.remove({}, (error) => {
      done();
    });
  });

  describe("POST /auth/create", () => {
    it("It should create a user.", done => {
      chai.request(server)
        .post(`/auth/create`)
        .send({
          email: "picard@enterprise.com",
          handle: "cptPicard",
          password: "risa99"
        })
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("_id");
          res.body.should.have.property("email").eql("picard@enterprise.com");
          res.body.should.have.property("handle").eql("cptPicard");
          res.body.should.have.property("motto");
          res.body.motto.should.have.property("text").eql("");
          res.body.motto.should.have.property("user");
          res.body.motto.should.have.property("_id");
          res.body.should.have.property("token");
          expect(res.body.token).to.be.a.jwt;
          expect(res.body.token).to.be.signedWith(process.env.SECRET);
          done();
        });
    });
  });

  describe("POST /auth/login", () => {
    it("It should log a user in.", done => {
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
              .post(`/auth/login`)
              .send({
                email: "picard@enterprise.com",
                password: "risa99"
              })
              .end((error, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("_id");
                res.body.should.have.property("email").eql("picard@enterprise.com");
                res.body.should.have.property("handle").eql("cptPicard");
                res.body.should.have.property("motto");
                res.body.motto.should.have.property("text").eql("");
                res.body.motto.should.have.property("user");
                res.body.motto.should.have.property("_id");
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
});
