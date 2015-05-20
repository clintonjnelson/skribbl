'user strict';

var Skribbl = require('../models/skribbl.js');
var skribblTree;
var childArray;

module.exports = {
  buildTree: buildTree,
  addGrandChildren: addGrandChildren
}

function buildTree(topParent, callback) {
  Skribbl.find({ parent_skribbl: topParent._id }, function( err, first_children ) {
    childArray = first_children;  // [ {skribbl1}, {skribbl2}, {skribbl3} ];
    if ( err ) {
      console.log( 'Error finding 1st level skribbl children. Error: ', err );
      return res.status(500).json({ msg: 'Database Error' });
    }

    if (childArray.length === 0) {  // no children. done
      skribblTree = JSON.parse( JSON.stringify( topParent ) ); // copy parent_skribbl
      skribblTree.children = childArray;
      return callback(skribblTree);
    }

    addGrandChildren(childArray, [], topParent, callback);  // add grandchildren
  });
}

// TODO: Refactor build-tree down, so ONLY need this function(below) to do ALL
//       Make recursive with optional depth or run through all layers
function addGrandChildren(scribblesArray, compiledArray, topParent, callback) {
  var skribblesArr = JSON.parse( JSON.stringify(scribblesArray));
  var compiledArr  = JSON.parse( JSON.stringify(compiledArray ));

  // scribblesArr[0] always, because it chopps scribblesArr & calls function again.
  Skribbl.find({ parent_skribbl: skribblesArr[0]._id }, function(err, children) {
    if (err) {
      console.log('Error finding children. Error: ', err);
      return res.status(500).json({msg: 'Database Error'});
    }

    skribblesArr[0].children = children;   //{ skribbl0 [ {skribbl1}, {skribbl2}, {skribbl3} ]}
    compiledArr.push(skribblesArr[0]);     // add to finished bottom-2-tier array

    if (scribblesArray.length > 1) {       // look at what orig came in
      addSubChildren(skribblesArr.slice(1), compiledArr, topParent);
    } else {
      skribblTree = JSON.parse( JSON.stringify( topParent ) ); // copy parent_skribbl
      skribblTree.children = compiledArr;
      callback(skribblTree);
    }
  });
}
