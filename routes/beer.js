
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

var BeerSchema = new Schema({
  name: { type: String, default: '' },
  description: { type: String },
  style: { type: String },
  teorAlcool: { type: [Number] },
  category: { type: String, default: ''},
  created: { type: Date }
});

var Beer = mongoose.model('Beer', BeerSchema);

exports.list = function(req, res){

	Beer.find(function (err, beers) {
		if(err) {
			console.log('Houve algum erro, tente novamente', err);
		} else {
			res.send(beers)
			res.end();
		}
	})
};

exports.add = function(req, res) {
	var dados = req.body;

	var beer = new Beer(dados);

	beer.save(function(err) {
		if(err){
			console.log(err);
		} else {
			console.log('Não foi cadastrado, tente novamente');
		}
	});

	res.end();
};

exports.viewAdd = function(req, res) {
	res.status(200);
	res.set('Content-Type', 'text/html');
	res.render('form', function(err, html) {
		if(err)
			console.log('error', err);
		console.log(html);
		res.write(html);
	});
};

exports.edit = function(req, res){
	var result = req.body;

	Beer.update({_id: req.params.id}, result, function(err, beer) {
		if(err) {
			console.log(err);
		} else {
			console.log('Breja atualizada com sucesso');
		}
	});

	res.end();
};

exports.remove = function(req, res) {
	var result = req.body;

	Beer.remove({_id: req.params.id}, function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log('Breja deletada com sucesso');
		}
	});

	res.end();
};

// Expose
exports.index = function(req, res){
	res.render('/beers/index');
};
