
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var swig = require('swig');
var cradle = require('cradle');

var app = express();

// set up swig
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

// set up cradle
cradle.setup({
  host: 'localhost',
  cache: false
});

var connection = new cradle.Connection;
var db = connection.database('escalader');

db.save('_design/users', {
  all: {
    map: function(doc){
      if(doc.type == 'user') emit(null, doc);
    }
  }
});

db.save('_design/roles', {
  all: {
    map: function(doc){
      if(doc.type == 'role') emit(null, doc);
    }
  }
});

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
  audience: 'http://localhost:' + app.get('port'),
  verifyResponse: function(err, req, res, email){
    if(err){
      res.json({ status: 'failure', reason: 'Persona Error: '+err });
      return;
    } if(email.indexOf('escalader.co.uk') !== -1) {
      req.session.authorised = true;
      res.json({ status: 'okay', email: email });
      return;
    }
    res.json({ status: 'failure' });
  },
  logoutResponse: function(err, req, res){
    if(err){
      res.json({ status: 'failure', reason: 'Persona Error: '+err });
      return;
    } if(req.session.authorised) req.session.authorised = false;
    res.json({ status: 'okay' })
  }
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  app.set('view cache', false);
  swig.setDefaults({ cache: false });
}

var routes = require('./routes');
routes.staff = require('./routes/staff');

app.get('/', routes.index);

app.all('/staff', routes.staff.requireAuthentication);
app.all('/staff/*', routes.staff.requireAuthentication);
app.get('/staff', routes.staff.index);
app.get('/staff/users', routes.staff.users);
app.post('/staff/users', routes.staff.users.post);
app.get('/staff/users/permissions', routes.staff.users.permissions);
app.post('/staff/users/permissions', routes.staff.users.permissions.post);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
