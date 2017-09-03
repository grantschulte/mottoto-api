process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

const mongoose = require("mongoose");
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
});
