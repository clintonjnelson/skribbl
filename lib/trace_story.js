'use strict';

var Skribbl = require('../models/skribbl');

function traceStory( skribbl, traceArray, callback ) {
  if ( !skribbl ) {
    return callback( 'Skribbl not found', null );
  } else {
    Skribbl.findOne({ _id: skribbl.parent_skribbl }, function( err, node ) {
      if ( err ) {
        callback( err, null );
      }
      var finalTrace = traceArray || [];
      finalTrace.push( node );
      if ( !node.parent_skribbl ) {
        return callback( null, finalTrace );
      }
      traceStory( node, finalTrace, callback );
    });
  }
}

module.exports = traceStory;
