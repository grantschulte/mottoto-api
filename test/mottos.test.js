process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const should = chai.should();
const server = require("../server");

const Motto = require("../src/routes/mottos/model");

chai.use(chaiHttp);

describe("Mottos", () => {
  beforeEach((done) => {
    Motto.remove({}, (error) => {
      done();
    });
  });

  // GET /mottos

  describe("GET /mottos", () => {
    it("It should GET all mottos.", done => {
      chai.request(server)
        .get("/mottos")
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  // POST /mottos

  describe("POST /mottos", () => {
    it("It should POST a motto.", done => {
      const motto = new Motto({
        text: "Make it so.",
        user: new mongoose.Types.ObjectId()
      });

      motto.save((error, motto) => {
        chai.request(server)
          .post("/mottos")
          .send(motto)
          .end((error, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("text").eql("Make it so.");
            res.body.should.have.property("user");
            done();
          });
      });
    });
  });

  // GET /mottos/:id

  describe("GET /mottos/:id", () => {
    it("It should GET a motto by id.", done => {
      const motto = new Motto({
        text: "Make it so.",
        user: new mongoose.Types.ObjectId()
      });

      motto.save((error, motto) => {
        chai.request(server)
          .get(`/mottos/${motto.id}`)
          .end((error, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("text").eql("Make it so.");
            done();
          });
      });
    });
  });

  // PUT /mottos/:id

  describe("PUT /mottos/:id", () => {
    it("It should UPDATE a motto by id.", done => {
      const motto = new Motto({
        text: "Number one, you have the bridge.",
        user: new mongoose.Types.ObjectId()
      });

      motto.save((error, motto) => {
        chai.request(server)
          .put(`/mottos/${motto.id}`)
          .send({ text: "Engage!" })
          .end((error, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("text").eql("Engage!");
            done();
          });
      });
    });
  });

  // DELETE /mottos/:id

  describe("DELETE /mottos/:id", () => {
    it("It should DELETE a motto by id.", done => {
      const motto = new Motto({
        text: "Make it so.",
        user: new mongoose.Types.ObjectId()
      });

      motto.save((error, motto) => {
        chai.request(server)
          .delete(`/mottos/${motto.id}`)
          .end((error, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("ok").eql(1);
            res.body.should.have.property("n").eql(1);
            done();
          });
      });
    });
  });
});
