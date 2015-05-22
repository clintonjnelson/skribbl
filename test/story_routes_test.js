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


describe('Story routes', function() {

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

	describe('GET /api/storys', function (){
		describe('with valid inputs', function(){
			it('should return aray length > 0',function(done){
				chai.request('localhost:3000')
					.get('/api/storys')
					.end(function(err, res){
						expect(err).to.eql(null);
						expect(res.body.length).to.be.above(0);
						done();
					});
			});
		});
	});

	describe('GET /api/storys/:id', function (){
		describe('with valid id', function(){
			it('should return aray length > 0',function(done){
				var route = "/api/storys/" + validid;
				chai.request('localhost:3000')
					.get(route)
					.end(function(err, res){
						expect(err).to.eql(null);
						expect(res.body.length).to.be.above(0);
						done();
					});
			});
		});
	});

	describe('GET /api/storys/:id', function (){
		describe('with invalid id', function(){
			it('req.body should be empty',function(done){
				var route = "/api/storys/" + '555555555555555555555555' ;
				chai.request('localhost:3000')
					.get(route)
					.end(function(err, res){
						expect(err).to.eql(null);
						expect(_.isEmpty( res.body)).to.eq(true);
						done();
					});
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
        .get('/api/storys/reading/' + lowerSkribbl._id)
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
        .get('/api/storys/reading/random')
        .end(function(err, res) {
          expect(err).to.eq(null);
          expect(typeof res.body).to.eq('string');
          expect(res.body.length).to.be.above(0);
          done();
        });
    });
  });

	describe('GET /api/storys/random/:num?', function() {
		describe('when 1 is passed for :num', function() {
			it('returns 1 random story skribbl', function(done) {
				chai.request('localhost:3000')
					.get('/api/storys/random/1')
					.end(function(err, res) {
						expect(err).to.eq(null);
						expect(res.body instanceof Array).to.eq(true);
						expect(res.body.length).to.eq(1);
						done();
					});
			});
		});
    describe('when no value is passed for num', function() {
      it('returns default up to 20 random story skribbls', function(done) {
        chai.request('localhost:3000')
          .get('/api/storys/random')
          .end(function(err, res) {
            expect(err).to.eq(null);
            expect(res.body instanceof Array).to.eq(true);
            expect(res.body.length).to.eq(2); // 2 is all there are in the db
            done();
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
