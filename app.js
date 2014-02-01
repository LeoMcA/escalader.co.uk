
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var swig = require('swig');

var app = express();

// set up swig
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: "maytheforcebewithyou" }));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

require("express-persona")(app, {
  audience: 'http://localhost:' + app.get('port')
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  app.set('view cache', false);
  swig.setDefaults({ cache: false });
}

app.get('/', routes.index);

app.all('/staff', routes.staff.requireAuthentication);
app.all('/staff/*', routes.staff.requireAuthentication);
app.get('/staff', routes.staff);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
