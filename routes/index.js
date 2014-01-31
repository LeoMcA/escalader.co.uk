
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.staff = function(req, res){
  var data = {
    email: false
  };
  if(req.session) data.email = req.session.email;
  res.render('staff', data);
}
