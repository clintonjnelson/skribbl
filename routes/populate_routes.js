"use strict";

var bodyparser = require('body-parser');
var popDB      = require("../lib/pop_db.js").loremStorys;

module.exports = function(router){
  router.use(bodyparser.json());

  // populate the DB
  router.get('/populate/:number', function(req, res) {

    popDB(req.params.number, function() {
    });
      res.status(200).json({success: true});
    });
  };
