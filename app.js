
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var beer = require('./routes/beer');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/beers', beer.list);
app.post('/beers/add', beer.add);
app.get('/beers/add', beer.viewAdd);
app.put('/beers/edit/:id', beer.edit);
app.delete('/beers/remove/:id', beer.remove);

// render views
app.get('/beers/', beer.index);
app.get('/beers/create', routes.expose);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
