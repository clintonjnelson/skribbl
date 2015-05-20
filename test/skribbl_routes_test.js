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
	describe.skip('POST /api/skribbl', function (){
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
		var origSkribblId;
    before(function(done) {
	    var skribblArr = [];
	    var skribblData;
	    var numSkribbls = 5;
      for (var entry, i = 0 ; i<numSkribbls; i++) {
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
      skribblArr.forEach(function(skrib, index, origArr) {
          newSkribbl = new Skribbl(skrib);
          if (index === 0) { origSkribblId             = newSkribbl._id;  }
          if (index > 0  ) { newSkribbl.parent_skribbl = prevSkribbl._id; }

          (function(newSkrib, ind, skribArr) {     // IFFE for async closure
    	      newSkribbl.save(function(err, data) {  // jshint ignore:line
              if (err) { throw err; }
              if( ind === skribArr.length - 1) {
                done();
              }
  	        });                                    // jshint ignore:line
          })(newSkribbl, index, skribblArr);

          prevSkribbl = newSkribbl;
	    });
	  });
    // describe('before function', function() {
    //   it('loads the database', function(done) {
    //     Skribbl.find({}, function(err, data) {
    //       console.log('DATABASE LOOKS LIKE THIS: ', data);
    //       done();
    //     });
    //   });
    // });

		describe('with VALID id', function() {
      it('returns an array of the results found', function(done) {
        chai.request('localhost:3000')
          .get('/api/skribbl/' + origSkribblId)
          .end(function(err, res) {
            expect(err).to.eq(null);
            expect(res.body instanceof Array).to.eq(true);
            done();
          });
      });
      it('returns an array of children in the parent', function(done) {
        chai.request('localhost:3000')
          .get('/api/skribbl/' + origSkribblId)
          .end(function(err, res) {
            expect(err).to.eq(null);
            var topParent = res.body[0];
            expect(topParent.children instanceof Array).to.eq(true);
            done();
          });
      });
      it('returns a an array of grandchildren per child', function(done) {
        chai.request('localhost:3000')
          .get('/api/skribbl/' + origSkribblId)
          .end(function(err, res) {
            expect(err).to.eq(null);
            var topParent = res.body[0];
            var childOne = topParent.children[0];
            console.log('---------- TEST RESULTS -----------');
            console.log('PARENT: ', topParent);
            console.log('CHILD ONE: ', childOne);
            console.log('GRANDCHILDREN: ', childOne.children);
            expect(childOne.children instanceof Array).to.eq(true);
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
});














