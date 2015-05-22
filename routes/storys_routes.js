'use strict';

var bodyparser = require('body-parser');
var reverse    = require('lodash').reverse;
var sample 		 = require('lodash').sample;
var Skribbl 	 = require('../models/skribbl.js');
var trace      = require('../lib/trace_story.js');

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

  router.get('/storys/reading/random', function(req, res) {
    Skribbl.find({}, 'id', function(err, skribblIDs) {
      var randomSkribbl;
      if (err) {
        console.log('Error querying skribls for random story. Error: ', err);
        return res.status(500).json( '' );
      }
      randomSkribbl = sample(skribblIDs);

      Skribbl.find({'_id': randomSkribbl}, function(req, endSkribbl) {
        if (err) {
          console.log('Error querying the random skribbl. Error: ', err);
          return res.status(500).json( '' );
        }

        trace(endSkribbl[0], [], function(err, storyArr) {
          var fullStory = '';
          if (err) {
            console.log('Error pulling full story trace. Error: ', err);
            return res.status(500).json( '' );
          }
          if (storyArr.length === 0) {
            return res.json( fullStory.content );
          }
          storyArr.reverse();

          storyArr.forEach(function(part, index, origArr) {
            fullStory += part.content;

            if (index === storyArr.length -1) {  // if last part
              res.json( fullStory );
            }
          });
        });
      });
    });
  });

  // Querying specific story
  router.get('/storys/reading/:id', function(req, res) {
    var requestID = req.params.id;
    Skribbl.find({'_id': requestID}, function(err, skribbl) {
      if (err) {
        console.log('Error querying skribls for specific story. Error: ', err);
        return res.status(500).json( '' );
      }

      trace(skribbl[0], [], function(err, storyArr) {
        var fullStory = '';
        if (err) {
          console.log('Error pulling full story trace. Error: ', err);
          return res.status(500).json( '' );
        }
        if (storyArr.length === 0) {
          return res.json( fullStory.content );
        }
        storyArr.reverse();
        storyArr.forEach(function(part, index, origArr) {
          fullStory += part.content;

          if (index === storyArr.length -1) {           // if last part
            res.json( fullStory + skribbl[0].content ); // Adds first part in
          }
        });
      });
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
