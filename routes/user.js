
/*
 * GET beers listing.
 */

/**
 * MongoDB
 */
var mongoose = require('mongoose')
 , Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/mongoose-test');
var db = mongoose.connection;
