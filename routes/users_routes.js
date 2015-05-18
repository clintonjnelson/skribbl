'user strict';

var bodyparser = require('body-parser');
var eatAuth  = require('../lib/eat_auth.js')(process.env.AUTH_SECRET);
var User       = require('../models/User.js');


module.exports = function loadUserRoutes(router) {
  router.use(bodyparser.json());

  // Return user by username
  router.get('/users/:username', function(req, res) {
    var username = req.params.username;
    User.find({'username': username}, function(err, user) {
      if (err) {
        console.log('Error finding user: ', err);
        // TODO: WHAT RETURN DOES IOS WANT HERE?
        return res.status(500).json({msg: 'internal server error'});
      }
      if (user.length === 0) {
        // TODO: WHAT RETURN DOES IOS WANT HERE?
        return res.json({msg: 'could not find user'});
      }

      // TODO: filter out password & EAT here?
      res.json(user); // send user data
    });
  });

  // Create new user
  router.post('/users/createuser', function(req, res) {
    // populate new user data
    var userData = JSON.parse(JSON.stringify(req.body));  // copy user post data
    delete userData.password;
    delete userData.email;
    userData.basic = { email: req.body.email };
    var newUser = new User(userData);

    // validate password length
    if (req.body.password.length < 6) {
      delete req.body.password;                           // remove password
      return res.status(400).json({ userInput: req.body,  // send inputs back
                                          msg: 'internal server error'});
    }

    // generate hash & save user
    newUser.genHash(req.body.password, function(hash) {
      newUser.basic.password = hash;
      newUser.save(function(err, user) {
        if (err) {
          console.log('Error saving user. Error: ', err);
          // TODO: WHAT RETURN DOES IOS WANT HERE?
          return res.status(500).json({msg: 'internal server error'});
        }

        // generate EAT
        user.generateToken(process.env.AUTH_SECRET, function(err, eat) {
          if (err) {
            console.log('Error generating EAT after user creation. Error: ', err);
            // TODO: WHAT RETURN DOES IOS WANT HERE?
            return res.json({msg: 'User created. Please sign in.'});
          }
          // TODO: WHAT RETURN DOES IOS WANT HERE?
          res.json({eat: eat, msg: 'user created'});
        });
      });
    });
  });

  // Update user
  router.patch('/users/:username', eatAuth, function(req, res) {
    console.log('HERE"S THE REQ.BODY FOR UPDATE: ', req.body);
    var updatedUserInfo = req.body;
    delete updatedUserInfo._id;
    delete updatedUserInfo.eat;     // delete encoded token

    if (username !== req.user.username) {  // verify ownership
      console.log('User tried to delete another user.');
      // TODO: WHAT RETURN DOES IOS WANT HERE? MSG? FALSE? BOTH? REDIRECT?
      return res.status(401).json({msg: 'Unauthorized.'});
    }

    // TODO: change update query to '_id': req.user._id from eatAuth
    User.update({'username': req.params.username}, function() {
      // TODO: WHAT RETURN DOES IOS WANT HERE? MSG? FALSE? BOTH?
      switch(true) {
        case !!(err && err.code === 11000):
          return res.json({msg: 'username already exists - please try a different username'});
        case !!(err && err.username):
          return res.json({msg: err.username.message.replace('Path', '')});
        case !!err:
          console.log(err);
          return res.status(500).json({msg: 'internal server error'});
      }

      // TODO: WHAT DOES IOS WANT HERE? true/false?
      res.json({msg: 'user updated'});
    });
  });

  // Destroy user
  router.delete('/users/:username', eatAuth, function(req, res) {
    var username = req.params.username;
    if (username !== req.user.username) {  // verify ownership
      console.log('User tried to delete another user.');
      // TODO: WHAT RETURN DOES IOS WANT HERE? MSG? FALSE? BOTH? REDIRECT?
      return res.status(401).json({msg: 'Unauthorized.'});
    }

    User.findOneAndRemove({'username': username}, function(err, data) {
      if (err) {
        console.log('Error deleting user. Error: ', err);
        // TODO: WHAT RETURN DOES IOS WANT HERE?
        return res.status(500). json({msg: 'internal server error'});
      }

      // TODO: WHAT DOES IOS WANT HERE? true/false? message?
      res.json({msg: (data && data.result && data.result.n ? 'user removed' : 'user could not be removed') || 'probably success' });
    });
  });
};















