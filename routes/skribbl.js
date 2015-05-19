'use strict';

var bodyparser = require('body-parser');
var eatAuth    = require('../lib/eat_auth.js')(process.env.AUTH_SECRET);
var Skribbl       = require('../models/Skribbl.js');

module.exports = function( router, passport ) {
  
  router.use( bodyparser.json() );

  router.post( '/skribbl', function( req, res ) {
    var parent_skribbl = Skribbl.findOne({
      _id: req.body.parent_skribbl
    }, function( err, parent_skribbl ) {
      if ( err ) {
        console.log( err );
      } else if ( parent.length > 0 ) {
        // Skribbl has a parent
        var newSkribbl = new Skribbl({
          created_at: new Date().getTime(),
          content: req.body.content,
          author: req.body.author,
          parent_skribbl: req.body.parent_skribbl,
          genre: req.body.genre,
          story_id: req.body.story_id,
          story_name: req.body.story_name

        })
      } else {

      }
      newSkribbl.save()
  });

  router.get( '/skribbl/:id', function( req, res ) {

  });


}
