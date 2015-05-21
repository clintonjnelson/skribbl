'use strict';

// var eat  = require('eat');
// var User = require('../models/User.js');

module.exports = function(role) {

 return function adminAuth(req, res, next) {
    var userRole = req.user.role;

    if (userRole !== role) {  // verify ownership
      console.log('User without admin privileges tried to delete a user.');
      return res.status(401).json({msg: 'Unauthorized.'});
    }
   next();
  };
};
