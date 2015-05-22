'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
var mongoose = require('mongoose');
var Skribbl = require('../models/skribbl.js');
var populateDB = require('../lib/pop_db.js').loremStorys;
var _ = require('lodash');
chai.use(chaihttp);

// Use test db
process.env.MONGOLAB_URI = 'mongodb://localhost/skribbl_test';

// Start api server for testing
require('../server.js');


describe('Reading routes', function() {

  var validid = null;
  var lowerSkribbl;
  before(function(done) {
    populateDB(5, function(){
      Skribbl.find({}, function(err, skribbl){
        if (err) throw err;
        validid = skribbl[0]._id;
        lowerSkribbl  = skribbl[10];
        done();
      });
    });
  });

  describe('THE DATABASE', function() {
    it('is filled with', function(done) {
      Skribbl.find({parent_skribbl: null}, function(err, skribs) {
        console.log('DATABASE IS: ', skribs);
        done();
      });
    });
  });

  describe('GET /storys/reading/:id', function(req, res) {
    it('returns a random story string', function(done) {
      chai.request('localhost:3000')
        .get('/api/reading/' + lowerSkribbl._id)
        .end(function(err, res) {
          expect(err).to.eq(null);
          expect(typeof res.body).to.eq('string');
          expect(res.body.length).to.be.above(0);
          expect(res.body).to.include(lowerSkribbl.content);
          done();
        });
    });
  });

  describe('GET /storys/reading/random', function(req, res) {
    it('returns a random story string', function(done) {
      chai.request('localhost:3000')
        .get('/api/reading/random')
        .end(function(err, res) {
          expect(err).to.eq(null);
          expect(typeof res.body).to.eq('string');
          expect(res.body.length).to.be.above(0);
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
