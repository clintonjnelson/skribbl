'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
var mongoose = require('mongoose');
var Skribbl = require('../models/skribbl.js');
chai.use(chaihttp);

// Use test db
process.env.MONGOLAB_URI = 'mongodb://localhost/OPAAT_test';

// Start api server for testing
require('../server.js');

describe('Story routes', function() {
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
		describe('with valid inputs', function(){
			it('should return aray length > 0',function(done){
				chai.request('localhost:3000')
					.get('/api/story/')
					.end(function(err, res){
						expect(err).to.eql(null);
						expect(res.body.length).to.be.above(0);
						done();
					});
			});
		});
	});
});
