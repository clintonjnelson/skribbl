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
    if ( err ) {
      console.log( 'Error finding 1st level skribbl children. Error: ', err );
      return res.status(500).json({ msg: 'Database Error' });
    }

    childArray = first_children;  //[ {skribbl1}, {skribbl2}, {skribbl3} ];

    // TODO: ONLY ADD SUBCHILDREN IF THERE IS SOMETHING IN CHILDARRAY, ELSE DONE.
    if (childArray.length === 0) {
      skribblTree = JSON.parse( JSON.stringify( topParent ) ); // copy parent_skribbl
      skribblTree.children = childArray;
      return callback(skribblTree);
    }
    addGrandChildren(childArray, [], topParent, callback);

  });
}

function addGrandChildren(scribblesArray, compiledArray, topParent, callback) {
  var skribblesArr = JSON.parse( JSON.stringify(scribblesArray)); // overwrite direct param is able later
  var compiledArr  = JSON.parse( JSON.stringify(compiledArray )); // overwrite direct param is able later
  // console.log('SCRIBBLES TREE BEFORE ADDING GRANDCHILDREN', topParent, skribblesArr);

  Skribbl.find({ parent_skribbl: skribblesArr[0]._id }, function(err, children) {
    // console.log('RESULTS OF TRYING TO FIND A GRANDCHILD', children);
    if (err) {
      console.log('Error finding children. Error: ', err);
      return res.status(500).json({msg: 'Database Error'});
    }

    skribblesArr[0].children = children;   //{ skribbl0 [ {skribbl1}, {skribbl2}, {skribbl3} ]}
    // console.log('IT THEN ADDS THE GRANDCHILD TO THE CHILD: ', skribblesArr[0]);
    compiledArr.push(skribblesArr[0]);        // add to finished bottom-2-tier array
    // console.log('SCRIBBLES ARRAY IN ADD GRANDCHILDREN LOOP CURRENTLY AT: ', skribblesArr);
    if (scribblesArray.length > 1) {       // look at what orig came in
      addSubChildren(skribblesArr.slice(1), compiledArr, topParent);
    } else {
      // lowest level
      skribblTree = JSON.parse( JSON.stringify( topParent ) ); // copy parent_skribbl
      skribblTree.children = compiledArr;
      callback(skribblTree);
    }
  });
}
