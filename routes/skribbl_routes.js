'use strict';

var bodyparser   = require('body-parser');
var buildTree    = require('../lib/tree3_by_id').buildTree;
var traceStory   = require('../lib/trace_story');
var eatAuth      = require('../lib/eat_auth.js')(process.env.AUTH_SECRET);
var EventEmitter = require('events').EventEmitter;
var guide        = new EventEmitter();
var Skribbl      = require('../models/skribbl.js');


module.exports = function( router, passport ) {

  router.use( bodyparser.json() );

  // Create skribbl
  router.post( '/skribbl', function( req, res ) {
    var newSkribbl = new Skribbl({
      content:        req.body.content,
      created_at:     new Date(),
      story_id:       req.body.story_id,
      story_name:     req.body.story_name,
      genre:          req.body.genre,
      parent_skribbl: req.body.parent_skribbl,
      author:         req.body.author,
    });
    newSkribbl.save(function( err, skribbl ) {
      if ( err ) {
        console.log( 'Error saving new skribbl. Error: ', err );
        return res.status(500).json({ "success": false });
      }
      res.json({ "success": true });
    });
  });

  // Get skribbls 2-levels below provided skribbl
  router.get( '/skribbl/:id', function( req, res ) {
    Skribbl.findOne({ _id: req.params.id }, function( err, topParent ) {
      if ( err ) {
        console.log( 'Error Finding Top Level Skribbl Parent. Error: ', err );
        return res.status(500).json( [] );
      }

      buildTree(topParent, function(err, finalTree) {
        if (err) {
          console.log('Error populating child/grandchild skribbls. Error: ', err);
          return res.status(500).json( [] );
        }
        res.json( [finalTree] );
      });
    });
  });

  router.get( '/skribbl/trace/:id', function( req, res ) {
    Skribbl.findOne({ _id: req.params.id }, function( err, skribbl ) {
      if ( err ) {
        console.log( err );
        return res.status(500).json({ message: 'Not Found' });
      }
      var trace = [];
      trace.push( skribbl );
      traceStory( skribbl, trace, function( err, finalTrace ) {
        if ( err ) {
          console.log( err );
          res.status(500).json({ message: 'Not Found' });
        }
        res.json( finalTrace );
      });
    });
  });
};
