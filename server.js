'use strict';

var express  = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var app      = express();

// Routers
var usersRouter = express.Router();
var authRouter  = express.Router();

// TEMP ENV VARIABLE SET HERE FOR DEVELOPMENT - CHANGE!
process.env.AUTH_SECRET = 'setThisVarInENV';

// Connect mongoose to MongoDB
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/OPAAT_dev');

// initialize passport strategy & configure w/ passport_strategy.js
app.use(passport.initialize());
require('./lib/passport_strategy.js')(passport);

// Load routers with routes
require('./routes/users_routes.js')(usersRouter);
require('./routes/auth_routes.js' )(authRouter, passport);

// Assign base routes for routers
app.use('/api', usersRouter);
app.use('/api', authRouter );

// Start server
app.listen(process.env.PORT || 3000, function() {
  console.log('server running on port ' + (process.env.PORT || 3000) );
});






