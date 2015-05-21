'use strict';

var bodyparser = require('body-parser');
var Skribbl = require('../models/skribbl.js');

module.exports = function(router){
	router.use(bodyparser.json());

	// Get the 20 newest stories
	router.get('/storys', function(req, res) {
		Skribbl.find({parent:null}, null,{limit:20} ,function(err, storys){
			if(err) {
				console.log(err);
				return res.status(500).json( [] );
			}
			res.status(200).json(storys);
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

	// Get 20 random storys (top level skribbls)
  router.get('/storys/random', function(req, res) {
    Skribbl.find({'parent_skribbl': null}, '_id', function(err, skribblIds) {
      var randomSkribbls;
      if (err) {
        console.log('Error querying top-levels for random skribbls. Error: ', err);
        return res.status(500).json( [] );
      }
      randomSkribbls = _.sample(skribblIds, 20);	// select 20 id's at random

      Skribbl.findOne({'_id': { $in: randomSkribbls }}, function(err, skribbls) {
        if (err) {
          console.log('Error querying chosen random skribbls. Error: ', err);
          return res.status(500).json( [] );
        }
        res.json( skribbls );
      });
    });
  });
};
