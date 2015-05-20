'use strict';

var chai     = require('chai');
var chaihttp = require('chai-http');
var expect   = chai.expect;
var mongoose = require('mongoose');
var populateDB = require("../lib/pop_db").loremStorys;
chai.use(chaihttp);

// Use test db
process.env.MONGOLAB_URI = 'mongodb://localhost/skribbl_test';

// Start api server for testing
require('../server.js');

describe("TIMELINE routes", function() {
  before(function(done) {
    populateDB(5, function() {
      done();
    });
  });

  it("should return an array", function(done) {
    chai.request("localhost:3000")
    .get("/api/timeline/IamAuser")
    .end(function(err, res) {
      expect(err).to.eq(null);
      expect(Array.isArray(res.body)).to.be.eql(true);
      expect(typeof res.body).to.eql("object");
      done();
    });
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });
});
