'use strict';

var popdb = require('../pop_db.js');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/OPAAT_test');


popdb.loremStorys(5, function(){
	console.log(process.argv);
	console.log('database has been populated with 5 storys');
	mongoose.connection.close();
	return;
});

