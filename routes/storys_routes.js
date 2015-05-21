'use strict';

var bodyparser = require('body-parser');
var sample 		 = require('lodash').sample;
var Skribbl 	 = require('../models/skribbl.js');

module.exports = function(router){
	router.use(bodyparser.json());

	// Get the 20 newest stories
	router.get('/storys', function(req, res) {
		Skribbl.find({parent_skribbl: null}, null, {limit:20} ,function(err, storys){
			if(err) {
				console.log(err);
				return res.status(500).json( [] );
			}
			res.status(200).json(storys);
		});
	});

	// Get a number of random storys (top level skribbls), defaults to 20
  router.get('/storys/random/:num?', function(req, res) {
    Skribbl.find({parent_skribbl: null}, 'id', function(err, skribblIds) {
      var randomSkribbls;
      var num = Number(req.params.num) || Math.min(20, skribblIds.length || 0);

      if (err) {
        console.log('Error querying top-levels for random skribbls. Error: ', err);
        return res.status(500).json( [] );
      }
      randomSkribbls = sample(skribblIds, num);	// select 20 id's at random

      Skribbl.find({'_id': { $in: randomSkribbls }}, function(err, skribbls) {
        if (err) {
          console.log('Error querying chosen random skribbls. Error: ', err);
          return res.status(500).json( [] );
        }
        res.json( skribbls );
      });
    });
  });

  // Get 20 stories from requested :id or newer
	router.get('/storys/:id', function(req, res) {
		Skribbl.find({_id: req.params.id}, function(err, ha){
			if (err) {
				console.log(err);
				return res.status(500).json( [] );
			}
			if (ha.length === 0) {
				console.log('error: invalid id');
				return res.status(500).json( [] );
			}
			Skribbl.find({_id: {$gt: req.params.id},parent: null},{},{limit:20} ,function(err, storys){
				if(err) {
					console.log(err);
					return res.status(500).json( [] );
				}
				res.status(200).json(storys);
			});
		});
	});
};
