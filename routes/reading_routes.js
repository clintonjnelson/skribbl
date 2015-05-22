'use strict';

var bodyparser = require('body-parser');
var reverse    = require('lodash').reverse;
var sample     = require('lodash').sample;
var Skribbl    = require('../models/skribbl.js');
var trace      = require('../lib/trace_story.js');


module.exports = function(router) {
  router.use(bodyparser.json());

  router.get('/reading/random', function(req, res) {
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
  router.get('/reading/:id', function(req, res) {
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
};
