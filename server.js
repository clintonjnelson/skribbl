'use strict';

var express  = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var app      = express();

// Routers
var usersRouter    = express.Router();
var authRouter     = express.Router();
var readingRouter  = express.Router();
var skribblRouter  = express.Router();
var storyRouter    = express.Router();
var timelineRouter = express.Router();
var populateRouter = express.Router();

// TEMP ENV VARIABLE SET HERE FOR DEVELOPMENT - CHANGE!
process.env.AUTH_SECRET = process.env.AUTH_SECRET || 'setThisVarInENV';

// Connect mongoose to MongoDB
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/skribbl_dev');

// initialize passport strategy & configure w/ passport_strategy.js
app.use(passport.initialize());
require('./lib/passport_strategy.js')(passport);

// Load routers with routes
require('./routes/users_routes.js'   )(usersRouter);
require('./routes/auth_routes.js'    )(authRouter, passport);
require('./routes/reading_routes.js' )(skribblRouter);
require('./routes/skribbl_routes.js' )(skribblRouter);
require('./routes/storys_routes.js'  )(storyRouter);
require('./routes/timeline_routes.js')(timelineRouter);
require('./routes/populate_routes.js')(timelineRouter);


// Assign base routes for routers
app.use('/api', usersRouter);
app.use('/api', authRouter );
app.use('/api', readingRouter);
app.use('/api', skribblRouter );
app.use('/api', storyRouter);
app.use('/api', timelineRouter );
app.use('/api', populateRouter );

// Start server
app.listen(process.env.PORT || 3000, function() {
  console.log('server running on port ' + (process.env.PORT || 3000) );
});
