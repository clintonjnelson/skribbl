"use strict";
var Skribbl = require("../models/skribbl.js");

module.exports = function(callback) {
  var array = [];
  var entry;
  for (var i = 0; i<5; i++) {
    entry = {
      content: 'it was a dark and stormy night' + i,
      created_at: new Date(),
      story_name: 'last night',
      genre: 'silly',
      author: 'IamAuser',
    };
    array.push(entry);
  }

  var counter = 0;
	var complete = 0;
  while(counter < array.length) {
    var newSkribbl = new Skribbl(array[counter]);
    newSkribbl.save(function(err, data) {  // jshint ignore:line
      if (err) { throw err; }

			complete++;
			if (complete == array.length){
				callback();
			}
    })
		counter++;
  }
};
