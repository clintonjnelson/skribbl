'use strict';

var mongoose = require('mongoose');

var SkribblSchema = mongoose.Schema({
	story_id: 			{type: mongoose.Schema.Types.ObjectId, ref: 'Skribbl', required: false},
	story_name: 		{type: String, required: true},
	content: 				{type: String, required: true},
	author: 				{type: String, ref: 'Skribbl', required: true},
	created_at: 		{type: Date, required: true},
	parent_skribbl: {type: mongoose.Schema.Types.ObjectId, ref: 'Skribbl', required: false},
	genre: 								 String
});

SkribblSchema.methods.generateStoryId = function(){
	if (this.story_id) return;
	var d = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (d + Math.random()*16)%16 | 0;
		d = Math.floor(d/16);
		return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	});
	this.story_id = uuid;
};

// check for empty string
SkribblSchema.path('story_name').validate(function(value){
	return /\S+/.test(value);
});
SkribblSchema.path('content').validate(function(value){
	return /\S+/.test(value);
});
SkribblSchema.path('genre').validate(function(value){
	return /\S+/.test(value);
});

module.exports = mongoose.model('Skribbl', SkribblSchema);
