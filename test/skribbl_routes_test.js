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

describe('Skribble routes', function() {
	var good_skribbl = {
		content: 'it was a dark and stormy night',
		story_id: 123412,
		story_name: 'the last night in qroakerville',
			//parent_skribbl: 'sldkjsldfj',
		genre: 'silly',
		author: 'slimeball',
	};
	describe('POST /api/skribbl', function (){
		describe('with valid inputs', function(){
			it('should return {success: true}', function(done){
				chai.request('localhost:3000')
					.post('/api/skribbl')
					.send(good_skribbl)
					.end(function(err, res){
						expect(err).to.eql(null);
						expect(res.body.success).to.eql(true);
						done();
					});
			});
		});

		describe('with invalid input to content', function(){
			it('should return {success: false}', function(done){
				var bad_skribbl = good_skribbl;
				bad_skribbl.content = '';
				chai.request('localhost:3000')
					.post('/api/skribbl')
					.send(good_skribbl)
					.end(function(err, res){
						expect(err).to.eql(null);
						expect(res.body.success).to.eql(false);
						done();
					});
			});
		});

		describe('with invalid input to story_name', function(){
			it('should return {success: false}', function(done){
				var bad_skribbl = good_skribbl;
				bad_skribbl.story_name = '';
				chai.request('localhost:3000')
					.post('/api/skribbl')
					.send(good_skribbl)
					.end(function(err, res){
						expect(err).to.eql(null);
						expect(res.body.success).to.eql(false);
						done();
					});
			});
		});

		describe('with invalid input to genre', function(){
			it('should return {success: false}', function(done){
				var bad_skribbl = good_skribbl;
				bad_skribbl.genre = '';
				chai.request('localhost:3000')
					.post('/api/skribbl')
					.send(good_skribbl)
					.end(function(err, res){
						expect(err).to.eql(null);
						expect(res.body.success).to.eql(false);
						done();
					});
			});
		});
	});
});
