'use strict';

var bodyparser = require('body-parser');
var eatAuth    = require('../lib/eat_auth.js')(process.env.AUTH_SECRET);
var Skribbl       = require('../models/Skribbl.js');

module.exports = function( router, passport ) {
  router.use( bodyparser.json() );

  router.post( '/skribbl', function( req, res ) {
    var newSkribbl = new Skribbl( req.body );
    newSkribbl.save()
  });

  router.get( '/skribbl/:id', function( req, res ) {

  });


}
