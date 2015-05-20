"use strict";

var bodyparser = require('body-parser');
var eatAuth    = require('../lib/eat_auth.js')(process.env.AUTH_SECRET);
var Skribbl    = require('../models/skribbl.js');

module.exports = function(router) {
  router.get("/timeline/:username", function(req, res) {
    Skribbl.find({"author": req.params.username}, function (err, info) {
      if (err) {
        console.log( err );
        return res.status(500).json({ "success": false });
      }
      res.json(info);
    });
  });
};
