
/*
 * GET beers listing.
 */

/**
 * MongoDB
 */
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/mybeersio');
var db = mongoose.connection;

var BeerSchema = new Schema({
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  style: { type: String, default: '' },
  teorAlcool: { type: Number, min: 0},
  category: { type: String, default: ''},
  ingredients: [{
  	name: { type: String, default: '' },
   	format: { type: String, default: '' },
   	type: { type: String, default: '' },
  }],
  created: { type: Date, default: Date.now },
});

var Beer = mongoose.model('Beer', BeerSchema);

exports.index = function(req, res){

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
