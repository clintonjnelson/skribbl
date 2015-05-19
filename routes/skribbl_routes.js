'use strict';

var bodyparser = require('body-parser');
var eatAuth    = require('../lib/eat_auth.js')(process.env.AUTH_SECRET);
var Skribbl    = require('../models/skribbl.js');

module.exports = function( router, passport ) {

  router.use( bodyparser.json() );

  router.post( '/skribbl', function( req, res ) {
    var newSkribbl = new Skribbl( req.body );
    newSkribble.save(function( err, skribbl ) {
      if ( err ) {
        console.log( err );
        return res.status(500).json({ "success": "false" });
      }
      res.json({ "success": "true" });
    })
  });

  router.get( '/skribbl/:id', function( req, res ) {

  });


}
