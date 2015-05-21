'use strict';

module.exports = function(role) {
 return function adminAuth(req, res, next) {
    var userRole = req.user.role;

    if (userRole !== role) {  // verify role
      console.log('Unauthorized user');
      return res.status(401).json({msg: 'Unauthorized'});
    }
   next();
  };
};
