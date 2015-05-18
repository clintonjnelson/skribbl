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


describe('Authentication', function() {
  var currentUser;
  var eaToken;
  beforeEach(function(done) {
    chai.request('localhost:3000')
      .post('api/users/createuser')
      .send({username: 'unicorn', email: 'unicorn@example.com', password: 'foobar'})
      .end(function(err, res) {
        expect(err).to.eq(null);
        eaToken = res.body.eat;
        User.findOne({username: 'unicorn'}, function(err, user) {
          expect(err).to.eq(null);
          currentUser = user;
          done();
        });
      });
  });
  afterEach(function() {
    mongoose.connection.db.dropDatabase(function(){});
  });

  describe('GET /signin', function() {
    it('returns an EAT auth token');
  });

  describe('GET /signout', function() {
    it('invalidates the EAT auth token');
  });
});

