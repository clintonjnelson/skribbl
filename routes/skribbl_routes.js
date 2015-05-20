'use strict';

var bodyparser   = require('body-parser');
var eatAuth      = require('../lib/eat_auth.js')(process.env.AUTH_SECRET);
var EventEmitter = require('events').EventEmitter;
var guide        = new EventEmitter();
var Skribbl      = require('../models/skribbl.js');

module.exports = function( router, passport ) {

  router.use( bodyparser.json() );

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
        console.log( err );
        return res.status(500).json({ "success": false });
      }
      res.json({ "success": true });
    });
  });

  router.get( '/skribbl/:id', function( req, res ) {
    Skribbl.findOne({ _id: req.params.id }, function( err, parent_skribbl ) {
      var scribbleTree;
      var childArray;

      if ( err ) {
        console.log( err );
        return res.status(500).json({ message: 'Database Error' });
      }

      Skribbl.find({ parent_skribbl: parent_skribbl._id }, function( err, first_children ) {
        if ( err ) {
          console.log( err );
          return res.status(500).json({ message: 'Database Error' });
        }
        childArray = first_children;  //[ {skribbl1}, {skribbl2}, {skribbl3} ];
        addSubChildren(childArray, [], parent_skribbl);

        // Event Emitter Functions
        function addSubChildren(scribblesArray, compiledArray, top_parent) {
          var scribblesArr = scribblesArray; // overwrite direct param is able later
          var compiledArr = compiledArray; // overwrite direct param is able later

          Skribbl.find({ parent_skribbl: scribbles[0]._id }, function(err, children) {
            if (err) {
              console.log('Error finding children. Error: ', err);
              return res.status(500).json({'Database Error'});
            }

            scribblesArr[0].children = children;   //{ skribbl0 [ {skribbl1}, {skribbl2}, {skribbl3} ]}
            compiledArr.push(scribbles[0]);        // add to finished bottom-2-tier array

            if (scribblesArray.length > 1) {       // look at what orig came in
              addSubChildren(scribblesArr.slice(1), compiledArr, top_parent);
            } else {
              // lowest level
              skribblTree = JSON.parse( JSON.stringify( parent_skribbl ) ); // copy parent_skribbl
              skribblTree.children = compiledArr;
              res.json( skribblTree );
            }
          });
        }
        // guide.emit('addSubChildren', childArray, []);
        // guide.on('addSubChildren', function(scribbles, compiled, parent) { // Emit: look at each, find children, pass to done callback, add to query
        //   Skribbl.find({ parent_skribbl: scribbles[0]._id }, function(err, children) {
        //     if (err) {
        //       console.log('Error finding children. Error: ', err);
        //       return res.status(500).json({'Database Error'});
        //     }
        //     scribbles[0].children = children;   { skribbl0 [ {skribbl1}, {skribbl2}, {skribbl3} ]}
        //     compiled.push(scribbles[0]);
        //     if (scribbles.length > 1) {
        //       guide.emit('addSubChildren', );
        //     } else {
        //       skribblTree = JSON.parse( JSON.stringify( parent_skribbl ) ); // copy parent_skribbl
        //     }
        //   })
        // });


        //res.json( skribblTree );
      });
    });
  });
};
