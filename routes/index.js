
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.expose = function(req, res){
  var entidade = req.params.entidade;
  var view = req.params.view;
  res.render(entidade + '/' + view);
};