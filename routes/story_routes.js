'use strict';

var bodyparser = require('body-parser');
var Skribbl = require('../models/skribbl.js');

module.exports = function(router){
	router.use(bodyparser.json());	
	router.get('/story', function(req, res) {
		Skribbl.find({parent:null}, null,{limit:20} ,function(err, storys){
			if(err) {
				console.log(err);
				return res.status(500).json({});
			}
			res.status(200).json(storys);
		});
	});

	router.get('/story/:id', function(req, res) {
		Skribbl.find({_id: req.params.id}, function(err, ha){
			if (err) {
				console.log(err);
				return res.status(500).json({});
			}
			if (ha.length === 0) {
				console.log(err);
				return res.status(500).json({});
			}	
			console.log(ha);
			Skribbl.find({_id: {$gt: req.params.id},parent: {}},{},{limit:20} ,function(err, storys){
				if(err) {
					console.log(err);
					return res.status(500).json({});
				}
				res.status(200).json(storys);
			});
		});
	});
};
