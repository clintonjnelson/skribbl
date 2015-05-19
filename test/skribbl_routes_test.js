'use strict';

var chai     = require('chai');
var chaihttp = require('chai-http');
var expect   = chai.expect;
var mongoose = require('mongoose');
var User     = require('../models/User.js');
chai.use(chaihttp);

// User test db
process.env.MONGOLAB_URI = 'mongodb://localhost/skribbl_test';

// Start test server
require('../server.js');


describe('Skribbl Routes', function() {
  before(function(done) {
    // setup db of new scribbles here
    done();
  });
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() { done(); });
  });

  describe('POST /api/skribbl', function() {
    describe('with VALID inputs', function() {
      it('creates a new skribbl object'); // verify new object in DB
      it('returns success:true');
    });
    describe('with INvalid inputs', function() {
      it('does NOT create a new skribbl');
      it('returns success:false');
    });
  });

  describe('GET /api/skribbl', function() {
    it('returns a random top-level scribble object');
    it('returns available child scribbls to 2-levels below');
  });

  describe('GET /api/skribbls', function() {
    it('returns 10 top level random scribbls');
    it('returns available child scribbls to 2-levels below EACH');
  });

  describe('GET /api/skribble/:id', function() {
    it('returns the requested scribbl object');
    it('returns available child scribbls to 2-levels below');
  });
});
