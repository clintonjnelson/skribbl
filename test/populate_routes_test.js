'use strict';

var chai     = require('chai');
var chaihttp = require('chai-http');
var expect   = chai.expect;
var mongoose = require('mongoose');
var User     = require('../models/User');
var theToken  = {};
var adminUser = {username: 'rainbow', email: 'rainbow@example.com', password: 'foobar123'};
var regUser = {username: 'rainbows', email: 'rainbows@example.com', password: 'foobar123'};

chai.use(chaihttp);

// Use test db
process.env.MONGOLAB_URI = 'mongodb://localhost/skribbl_test';

// Start api server for testing
require('../server.js');

describe("POPULATE route", function() {
  describe("WITH admin privileges", function() {
    before(function(done) {
        chai.request('localhost:3000')
          .post('/api/users')
          .send(adminUser)
          .end(function(err, res) {
            chai.request('localhost:3000')
              .get('/api/login')
              .auth(adminUser.email, adminUser.password)
              .end(function(err, res) {
                theToken.eat = res.body.eat;
                  User.update({ username: 'rainbow' }, { $set: { role: 'admin'}}, function( err, raw ) {
                    if ( err ) console.log( err );
                    done();
                  });
              });
          });
      });

    it("should populate the database and return a success object", function(done) {
      chai.request("localhost:3000")
      .get("/api/populate/5")
      .send(theToken)
      .end(function(err, res) {
        expect(err).to.eq(null);
        console.log(res.body);
        expect(res.body.success).to.eq(true);
        done();
      });
    });
  });

  describe("WITHOUT admin privileges", function() {
    before(function(done) {
        chai.request('localhost:3000')
          .post('/api/users')
          .send(regUser)
          .end(function(err, res) {
            chai.request('localhost:3000')
              .get('/api/login')
              .auth(regUser.email, regUser.password)
              .end(function(err, res) {
                theToken.eat = res.body.eat;
                done();
              });
          });
      });

    it("should NOT populate the DB", function(done) {
      chai.request("localhost:3000")
      .get("/api/populate/5")
      .send(theToken)
      .end(function(err, res) {
        expect(err).to.eq(null);
        console.log(res.body);
        expect(res.body.msg).to.eq("Unauthorized");
        done();
      });
    });

  });


  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });
});
