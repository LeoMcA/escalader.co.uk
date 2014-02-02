
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.staff = function(req, res){
  var data = {
    email: req.session.email
  };
  res.render('staff', data);
}

exports.staff.requireAuthentication = function(req, res, next){
  if(req.session.authorised) next();
  else res.render('login');
}
