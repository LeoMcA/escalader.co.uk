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
