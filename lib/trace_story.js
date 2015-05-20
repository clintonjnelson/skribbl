'use strict';

var Skribbl = require('../models/skribbl');

function traceStory( skribblId, trace, callback ) {
  Skribbl.findOne({ _id: skribblId }, function( err, youngest ) {
    if ( err ) {
      callback( err, null );
    }
    var finalTrace = trace || [];
    finalTrace.push( youngest );
    if ( youngest.parent_skribbl === null ) {
      callback( null, finalTrace );
    }
    while ( youngest.parent_skribbl !== null ) {
      traceStory( youngest.parent_skribbl, finalTrace, callback );
    }
  });
}

module.exports = traceStory;
