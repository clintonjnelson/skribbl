'use strict';

var bodyparser = require('body-parser');
var eatAuth    = require('../lib/eatAuth.js')(process.env.AUTH_SECRET);
var User       = require('../models/User.js');


module.exports = function(router) {
  router.use(bodyparser.json());

  router.post('/skribbl', eatAuth, function(req, res) {

  });

  router.get('/skribbl', eatAuth, function(req, res) {

  });

  router.get('/skribbls', eatAuth, function(req, res) {

  });
};
