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
	before(function(done) {
		populateDB(5, function(){
			Skribbl.find({}, function(err, skribbl){
				if (err) throw err;
				validid = skribbl[0]._id;
				done();
			});
		});
  });

	describe('GET /api/story', function (){
		describe('with valid inputs', function(){
			it('should return aray length > 0',function(done){
				chai.request('localhost:3000')
					.get('/api/story')
					.end(function(err, res){
						expect(err).to.eql(null);
						expect(res.body.length).to.be.above(0);
						done();
					});
			});
		});
	});

	describe('GET /api/story/:id', function (){
		describe('with valid id', function(){
			it('should return aray length > 0',function(done){
				var route = "/api/story/" + validid;
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

	describe('GET /api/story/:id', function (){
		describe('with invalid id', function(){
			it('req.body should be empty',function(done){
				var route = "/api/story/" + '555555555555555555555555' ;
				chai.request('localhost:3000')
					.get(route)
					.end(function(err, res){
						expect(err).to.eql(null);
						expect(_.isEmpty( res.body)).to.eql(true);
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
