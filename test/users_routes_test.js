'use strict';

var chai     = require('chai');
var chaihttp = require('chai-http');
var expect   = chai.expect;
var mongoose = require('mongoose');
var User     = require('../models/User.js');
chai.use(chaihttp);

// Use test db
process.env.MONGOLAB_URI = 'mongodb://localhost/skribbl_test';

// Start api server for testing
require('../server.js');


describe('Users', function() {

  describe('POST /api/users', function() {
    describe('WITHOUT existing user', function() {
      describe('with VALID inputs', function() {
        it('returns a success message',  function(done) {
          chai.request("localhost:3000")
            .post("/api/users")
            .send({username: "first entry", password: "foobar1", email: "initial@gmail.com"})
            .end(function(err, res) {
              expect(err).to.eql(null);
              expect(res.body.success).to.eql(true);
              expect(res.body.usernamePass).to.eql(true);
              expect(res.body.emailPass).to.eql(true);
              done();
            });
        });

      });
    });

    // existing user from above post request
    // should probably use a before block
    describe("WITH an existing user", function() {
      describe("with INVALID input", function() {
        it.skip("returns a fail JSON object due to duplicate username", function(done) {
          chai.request("localhost:3000")
            .post("/api/users")
            .send({username: "first entry", password: "foobar1", email: "changed@gmail.com"})
            .end(function(err, res) {
              expect(err).to.eql(null);
              expect(res.body.success).to.eql(false);
              expect(res.body.usernamePass).to.eql(false);
              done();
            });
        });

        it.skip("returns fail a JSON object due to duplicate email", function(done) {
          chai.request("localhost:3000")
            .post("/api/users")
            .send({username: "changed entry", password: "foobar1", email: "initial@gmail.com"})
            .end(function(err, res) {
              expect(err).to.eql(null);
              expect(res.body.success).to.eql(false);
              expect(res.body.emailPass).to.eql(false);
              done();
            });
        });
      });
    });
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });
});
