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
});
