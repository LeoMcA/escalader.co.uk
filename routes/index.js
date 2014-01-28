
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.staff = function(req, res){
  res.render('staff', {content: ''});
}
