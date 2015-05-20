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
		story_id: '555abbcf647c2b792bbfea5c',
		story_name: 'the last night in qroakerville',
		genre: 'silly',
		author: 'slimeball'
	};
	describe('POST /api/skribbl', function (){
		describe('with valid inputs', function(){
			it.skip('should return {success: true}', function(done){
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

	describe('GET /skribbl/:id', function() {
		before(function(done) {
	    var skribblArr = [];
	    var skribblData;
	    for (var entry, i = 0 ; i<5; i++) {
	      entry = {
	        content: 'it was a dark and stormy night' + i,
	        created_at: new Date(),
	        story_name: 'the last night in qroakerville',
	        genre: 'silly',
	        author: 'stephievictoria',
	      };
		    skribblArr.push(entry);
		  }

		  var newSkribbl;
      var prevSkribbl;
	  	var counter = 0;
	    while(counter < skribblArr.length) {
	      newSkribbl = new Skribbl(skribblArr[counter]);
	      if (counter > 0) { newSkribbl.parent_skribbl = prevSkribbl._id }

	      newSkribbl.save(function(err, data) {  // jshint ignore:line
	        if (err) { throw err; }
	        this.newSkribbl = data;
          prevSkribbl = data;
	      }.bind(this));
	      	counter++;
	    }
	    done();
	  });

		describe('with VALID id', function() {
      it('returns a tree with the orig at the top');
      it('returns a tree with the children array nested in the parent skribbl');
      it('returns a tree with the gran')
		});

    after(function(done) {
      mongoose.connection.db.dropDatabase(function() {
        done();
      });
    });
	});
});














