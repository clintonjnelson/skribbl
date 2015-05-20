'use strict';

var chai     = require('chai');
var chaihttp = require('chai-http');
var expect   = chai.expect;
var mongoose = require('mongoose');
// var User     = require('../models/User.js');
var Skribbl = require("../models/skribbl.js");
chai.use(chaihttp);

// Use test db
process.env.MONGOLAB_URI = 'mongodb://localhost/OPAAT_test';

// Start api server for testing
require('../server.js');


describe("TIMELINE routes", function() {
  before(function(done) {
    var array = [];
    var entry;
    for (var i = 0; i<5; i++) {
      entry = {
        content: 'it was a dark and stormy night' + i,
        created_at: new Date(),
        story_name: 'the last night in qroakerville',
        genre: 'silly',
        author: 'stephievictoria',
      };
    array.push(entry);
  }

  var counter = 0;
    while(counter < array.length) {
      var newSkribbl = new Skribbl(array[counter]);
      newSkribbl.save(function(err, data) {  // jshint ignore:line
        if (err) { throw err; }
        this.newSkribbl = data;
      }.bind(this));
      counter++;
    }
    done();
  });

  it("should return an array", function(done) {
    chai.request("localhost:3000")
    .get("/api/timeline/stephievictoria")
    .end(function(err, res) {
      expect(err).to.eq(null);
      expect(Array.isArray(res.body)).to.be.eql(true);
      expect(typeof res.body).to.eql("object");
      done();
    });
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });
});
