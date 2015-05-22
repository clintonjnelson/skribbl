'user strict';

var Skribbl = require('../models/skribbl.js');
var skribblTree;
var childArray;

module.exports = {
  buildTree: buildTree,
  addGrandChildren: addGrandChildren
};

function buildTree(topParent, callback) {
  if ( !topParent ) {
    return callback( 'No Top Parent', null );
  }
  Skribbl.find({ parent_skribbl: topParent._id }, function( err, first_children ) {
    childArray = first_children;  // [ {skribbl1}, {skribbl2}, {skribbl3} ];
    if ( err ) {
      console.log( 'Error finding 1st level skribbl children. Error: ', err );
      return callback(err, null);
    }

    if (childArray.length === 0) {  // no children. done
      skribblTree = JSON.parse( JSON.stringify( topParent ) ); // copy parent_skribbl
      skribblTree.children = childArray;
      return callback(null, skribblTree);
    }

    addGrandChildren(childArray, [], topParent, callback);  // add grandchildren
  });
}

// TODO: Refactor to use only function below (recursive) & not buildTree. Pass parent as array of one object
function addGrandChildren(scribblesArray, compiledArray, topParent, callback) {
  var skribblesArr = JSON.parse( JSON.stringify(scribblesArray));
  var compiledArr  = JSON.parse( JSON.stringify(compiledArray ));

  // scribblesArr[0] always, because it chopps scribblesArr & calls function again.
  Skribbl.find({ parent_skribbl: skribblesArr[0]._id }, function(err, children) {
    if (err) {
      console.log('Error finding children. Error: ', err);
      return callback(err, null);
    }

    skribblesArr[0].children = children;   //{ skribbl0 [ {skribbl1}, {skribbl2}, {skribbl3} ]}
    compiledArr.push(skribblesArr[0]);     // add to finished bottom-2-tier array

    if (scribblesArray.length > 1) {       // look at what orig came in
      addGrandChildren(skribblesArr.slice(1), compiledArr, topParent, callback);
    } else {
      skribblTree = JSON.parse( JSON.stringify( topParent ) ); // copy parent_skribbl
      skribblTree.children = compiledArr;
      callback(null, skribblTree);
    }
  });
}
