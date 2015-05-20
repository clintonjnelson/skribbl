'use strict';

var bodyparser = require('body-parser');
var Skribbl = require('../models/skribbl.js');

module.exports = function(router){
	router.use(bodyparser.json());	
	router.get('/story', function(req, res) {
		Skribbl.find({parent: null},null,{limit:20} ,function(err, storys){
			if(err) {
				console.log(err);
				return res.status(500).json(null);
			}
			res.status(200).json(storys);
		});
	});

	router.get('/story/:id', function(req, res) {
		console.log(req.params.id);
		Skribbl.find({_id: {$gt: req.params.id},parent: null},null,{limit:20} ,function(err, storys){
			if(err) {
				console.log(err);
				return res.status(500).json(null);
			}
			res.status(200).json(storys);
		});
	});
};
