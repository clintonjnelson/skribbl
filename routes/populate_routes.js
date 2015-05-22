"use strict"

var bodyparser = require('body-parser');
var eatAuth    = require('../lib/eat_auth.js')(process.env.AUTH_SECRET);
var User       = require('../models/User.js');
var popDB      = require("../lib/pop_db.js").loremStorys;
var Skribbl      = require('../models/skribbl.js');


module.exports = function(router){
  router.use(bodyparser.json());

  // populate the DB
  router.get('/populate/:number', function(req, res) {

    popDB(req.params.number, function() {
    });
      res.status(200).json({success: true});
    });
  };
