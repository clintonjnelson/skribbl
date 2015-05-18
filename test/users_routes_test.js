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

  describe('WITHOUT existing user', function() {
    describe('POST /api/createuser', function() {
      describe('with INVALID inputs', function() {
        it('returns an error message & user inputs if password is too short');
      });
      describe('with VALID inputs', function() {
        it('creates the new EAT auth token');
        it('returns a success message');
      });
    })

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
});


