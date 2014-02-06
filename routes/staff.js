var cradle = require('cradle')
var connection = new cradle.Connection;
var db = connection.database('escalader');

exports.requireAuthentication = function(req, res, next){
  if(req.session.authorised) next();
  else res.render('staff/login');
}

exports.index = function(req, res){
  var data = {
    email: req.session.email
  };
  res.render('staff/index', data);
}

exports.users = function(req, res){
  db.view('users/all', function(err, doc){
    if(err) console.log(err); // TODO: handle errors
    var data = {
      email: req.session.email,
      users: doc
    };
    res.render('staff/users', data);
  });
}

exports.users.post = function(req, res){
  db.save({
    type: 'user',
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    role: req.body.role
  }, function(err, cres){
    if(err) console.log(err); // TODO: handle errors
    res.redirect('/staff/users');
  });
}
