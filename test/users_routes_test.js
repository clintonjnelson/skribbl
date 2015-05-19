'use strict';

var chai     = require('chai');
var chaihttp = require('chai-http');
var expect   = chai.expect;
var mongoose = require('mongoose');
var User     = require('../models/User.js');
chai.use(chaihttp);

// Use test db
process.env.MONGOLAB_URI = 'mongodb://localhost/OPAAT_test';

// Start api server for testing
require('../server.js');


describe('Users', function() {
  describe('for existing user', function() {
    // Setup database w/use before each block
    var eaToken;
    var newUser;
    ///// make user & test


    describe('GET /api/users/unicorn for user with username: "unicorn" WITHOUT auth token', function(){
      before(function(done) {
        // make request here
        done();
      });

      it('returns the user');
      it('returns the username');
      it('returns the email');
    });

    describe('POST /api/users/unicorn', function() {
      it('prevents duplicate username');
      it('prevents duplicate email');
    });

    describe('PATCH /api/users/unicorn', function() {
      describe('PATCH /api/users/unicorn WITHOUT MATCHING auth token', function() {
        it('does NOT update the user');
        it('returns an error message');
      });
      describe('PATCH /api/users/unicorn WITH MATCHING auth token', function() {
        it('updates the user');
      });
    });

    describe('WITHOUT valid auth token', function() {
      it('does NOT allow PATCH user updates');
      it('does NOT allow DELETE user removal');
    });
  });



  describe('POST /api/users', function() {
    describe('WITHOUT existing user', function() {
      describe('with INVALID inputs', function() {
        it('returns an error message & user inputs if password is too short');
      });
      describe('with VALID inputs', function() {
        it('creates the new EAT auth token');

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
        it("returns a fail JSON object due to duplicate username", function(done) {
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

        it("returns fail a JSON object due to duplicate email", function(done) {
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

    describe('GET /api/users/notauser', function() {
      it('returns a generic error message');
    });
    describe('PATCH /api/users/12345wrong', function() {
      it('returns a generic error message');
    });
    describe('DELETE /api/users/12345wrong', function() {
      it('returns a generic error message');
    });
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

});


