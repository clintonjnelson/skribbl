"use strict";
var Skribbl = require("../models/skribbl.js");
var lorem = require('lorem-ipsum');
var popdb = require('./pop_db.js');

exports.loremIpafy = function (skribblDict){
		var tripyWords =  [ 'splicky', 'sickly', 'tuff', 'icky', 'dank', 'pinky', 'epic', 'magical', 'wild', 'gnar', 'metal', 'dippy', 'slimy', 'turnt', 'throad', 'raddical', 'ritious', 'holy', 'calabunga', 'trippy', 'tight', 'goat', 'apple' ];

		skribblDict.content = lorem({
			count: 4,
		 	units: 'sentences',
			sentenceLowerBound: 5,
			sentenceUpperBound: 15,
			format: 'plain'	,
			words: tripyWords
		});
		if (skribblDict.parent_skribbl === null) {
			skribblDict.story_name = lorem({
				count: 2,
				units: 'words',
				format: 'plain',
				words: tripyWords
				});
		}

		return skribblDict;
};

exports.loremStorys = function(numstorys, callback) {
  var entry = {
      content: 'it was a dark and stormy night' ,
      created_at: new Date(),
      story_name: null,
      genre: 'silly',
      author: 'IamAuser',
    };

	var zero_parent = null;
	var one_parent = null;
	var two_parent = null;
	var three_parent = null;
	var last_story_name = null;
	var count = 0;
	var index = 0;
	var saveSkribbl = function(entry){
	index = count % 30;
	entry.created_at = new Date();
	if (index === 0) {
		entry.parent_skribbl = null;
	} else if ( index < 4) {
		entry.parent_skribbl = zero_parent;
		entry.story_name = last_story_name;
	} else if ( index < 7) {
		entry.parent_skribbl = one_parent;
		entry.story_name = last_story_name;
	} else if ( index < 10) {
		entry.parent_skribbl = two_parent;
		entry.story_name = last_story_name;
	} else if ( index < 13) {
		entry.parent_skribbl = three_parent;
		entry.story_name = last_story_name;
	}
	popdb.loremIpafy(entry);
	last_story_name = entry.story_name;
	var skribbl = new Skribbl(entry);
	skribbl.save(function(err, data) {
		if (err) throw err;
		switch (index) {
			case 0:
				zero_parent = data._id;
				break;
			case 1:
				one_parent = data._id;
				break;
			case 2:
				two_parent = data._id;
				break;
			case 3:
				three_parent = data._id;
				break;
		}
		count++;
		if (count < 12 * numstorys){
			saveSkribbl(entry);
		}
		if (count === 12 * numstorys) return callback(null, null);
	});
};
	try {
		saveSkribbl(entry);
	} catch(err) {
		callback(err, null);
	}
};




