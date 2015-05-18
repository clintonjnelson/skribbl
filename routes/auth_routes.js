'use strict';

var bodyparser = require('bodyparser');
var eatAuth    = require('../lib/eat_auth.js')(process.env.AUTH_SECRET);
var User       = require('../models/User.js');


module.exports = function(router, passport) {
  router.use(bodyparser.json());

  // Existing user signin.
  router.get('/signin', passport.authenticate('basic', {session: false}, function(req, res) {
    req.user.generateToken(process.env.AUTH_SECRET, function(err, eat) {  // passport_strategy adds req.user
      if (err) {
        console.log('Error signin user in. Error: ', err);
        // TODO: WHAT DOES IOS WANT FAILURE TO RETURN? FALSE?
        return res.status(500).json({msg: 'error logging in'});
      }
      // TODO: WHAT DOES IOS WANT SUCCESS TO RETURN BESIDES EAT? USER? TRUE?
      // IF USER, REMOVE EAT & PASSWORD HASH
      res.json({eat: eat})
    });
  }));

  router.get('/signout/:eat', eatAuth, function(req, res) {
    req.user.invalidateToken(function(err, confirm) {
      if (err) {
        console.log('Error invalidating token', err);
        // TODO: WHAT DOES IOS WANT FAILURE TO RETURN? FALSE?
        return res.status(500).json({msg: 'internal server error'});
      }
      // TODO: WHAT DOES IOS WANT SUCCESS TO RETURN?
      res.json({msg: 'you have been signed out'});
    })
  });
};
