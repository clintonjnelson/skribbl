'use strict';

var bodyparser = require('body-parser');
var eatAuth    = require('../lib/eat_auth.js')(process.env.AUTH_SECRET);
var Skribbl    = require('../models/skribbl.js');

module.exports = function( router, passport ) {

  router.use( bodyparser.json() );

  router.post( '/skribbl', function( req, res ) {
    var newSkribbl = new Skribbl({
      content: req.body.content,
      created_at: new Date(),
      story_id: req.body.story_id,
      story_name: req.body.story_name,
      genre: req.body.genre,
      parent_skribbl: req.body.parent_skribbl,
      author: req.body.author,
    });
    newSkribbl.save(function( err, skribbl ) {
      if ( err ) {
        console.log( err );
        return res.status(500).json({ "success": false });
      }
      res.json({ "success": true });
    });
  });

  router.get( '/skribbl/:id', function( req, res ) {
    Skribbl.findOne({ _id: req.params.id }, function( err, parent_skribbl ) {
      if ( err ) {
        console.log( err );
        return res.status(500).json({ message: 'Database Error' });
      }
      Skribbl.find({ parent_skribbl: parent_skribbl._id }, function( err, first_children ) {
        if ( err ) {
          console.log( err );
          return res.status(500).json({ message: 'Database Error' });
        }
        var childArray = [];
        first_children.forEach(function( el, i ) {
          childArray.push( el );
        });
        var skribblTree = JSON.parse( JSON.stringify( parent_skribbl ) );
        skribblTree.children = childArray;
        res.json( skribblTree );
      });
    });
  });
};
