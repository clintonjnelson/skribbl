'use strict';

var chai       = require('chai');
var chaihttp   = require('chai-http');
var expect     = chai.expect;
var mongoose   = require('mongoose');
var populateDB = require('../lib/pop_db.js').loremStorys;
var Skribbl    = require('../models/skribbl.js');
var User       = require('../models/User');
chai.use(chaihttp);

// Use test db
process.env.MONGOLAB_URI = 'mongodb://localhost/skribbl_test';

// Start api server for testing
require('../server.js');


describe('Skribble routes', function() {
  var good_eats;
  var bad_eats;
  var good_user    = {
    username: 'unicorn',
    email:    'unicorn@example.com',
    password: 'foobar'
  };
  var suspendedUser = {
    username: 'unicornFluff',
    email:    'unicornFluff@example.com',
    password: 'foobar123',
    suspended: true
  };
  var good_skribbl = {
    content: 'it was a dark and stormy night',
    story_id: '555abbcf647c2b792bbfea5c',
    story_name: 'the last night in qroakerville',
    genre: 'silly',
    author: 'slimeball'
  };

	before(function(done) {
    // Create a user and return EAT for use in tests
    chai.request('localhost:3000')
      .post('/api/users')
      .send(good_user)
      .end(function(err, res) {
        chai.request('localhost:3000')
          .get('/api/login')
          .auth(good_user.email, good_user.password)
          .end(function(err, res) {
            good_eats = res.body.eat;
            done();
          });
      });
  });
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() { done(); });
  });


	describe('POST /api/skribbl', function () {
    describe('with suspended user', function() {
      before(function(done) {
        chai.request('localhost:3000')
          .post('/api/users')
          .send(suspendedUser)
          .end(function(err, res) {
            chai.request('localhost:3000')
              .get('/api/login')
              .auth(suspendedUser.email, suspendedUser.password)
              .end(function(err, res) {
                bad_eats = res.body.eat;
                User.update( { username: 'unicornFluff' }, { $set: { suspended: true }}, function( err, raw ) {
                  if ( err ) console.log( err );
                  done();
                });
              });
          });
      });

      it('should return {success: false}', function(done){
        chai.request('localhost:3000')
          .post('/api/skribbl')
          .send(good_skribbl)
          .send({eat: bad_eats})
          .end(function(err, res){
            expect(err).to.eql(null);
            expect(res.body.msg).to.eql("Not allowed: suspended user");
            expect(res.body.success).to.eq(false);
            done();
          });
      });
    });



    describe('with valid inputs', function(){
			it('should return {success: true}', function(done){
				chai.request('localhost:3000')
					.post('/api/skribbl')
					.send(good_skribbl)
          .send({eat: good_eats})
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
          .send({eat: good_eats})
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
          .send({eat: good_eats})
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
          .send({eat: good_eats})
					.end(function(err, res){
						expect(err).to.eql(null);
						expect(res.body.success).to.eql(false);
						done();
					});
			});
		});

    describe.skip('WITHOUT eat auth token', function() {
      it('returns status:401 and success: false', function(done) {
        chai.request('localhost:3000')
          .post('/api/skribbl')
          .send(good_skribbl)
          .end(function(err, res){
            expect(err).to.eql(null);
            expect(res.status).to.eq(401);
            done();
          });
      });
    });
	});


	describe('GET /skribbl/:id', function() {
		var requestedId;
		var lastId;
    before(function(done) {
      mongoose.connection.db.dropDatabase(function() {
        mongoose.connect(process.env.MONGOLAB_URI, {}, function() {
          populateDB(5, function() {
            Skribbl.find({}, function(err, skribbls) {
              if (err) throw err;
              requestedId = skribbls[0]._id;
							lastId = skribbls[ skribbls.length -1 ]._id;
              done();
            });
          });
        });
      });
    });
    describe.skip('before function', function() {
      it('loads the database', function(done) {
        Skribbl.find({}, function(err, data) {
          console.log('DATABASE LOOKS LIKE THIS: ', data);
          done();
        });
      });
    });

		describe('with VALID id', function() {
      it('returns an array of the results found', function(done) {
        chai.request('localhost:3000')
          .get('/api/skribbl/' + requestedId)
          .end(function(err, res) {
            expect(err).to.eq(null);
            expect(res.body instanceof Array).to.eq(true);
            done();
          });
      });
      it('returns an array of children in the parent', function(done) {
        chai.request('localhost:3000')
          .get('/api/skribbl/' + requestedId)
          .end(function(err, res) {
            expect(err).to.eq(null);
            var topParent = res.body[0];
            expect(topParent.children instanceof Array).to.eq(true);
            done();
          });
      });
      it('returns a an array of grandchildren per child', function(done) {
        chai.request('localhost:3000')
          .get('/api/skribbl/' + requestedId)
          .end(function(err, res) {
            expect(err).to.eq(null);
            var topParent = res.body[0];
            var childOne = topParent.children[0];
            // console.log('---------- TEST RESULTS -----------');
            // console.log('PARENT: ', topParent);
            // console.log('CHILD ONE: ', childOne);
            // console.log('GRANDCHILDREN: ', childOne.children);
            expect(childOne.children instanceof Array).to.eq(true);
            done();
          });
      });
		});

		describe('Story Trace', function() {
			it('should return array of complete story', function( done ) {
				chai.request('localhost:3000')
					.get('/api/skribbl/trace/' + lastId )
					.end(function( err, res ) {
						expect( err ).to.eql(null);
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
});
