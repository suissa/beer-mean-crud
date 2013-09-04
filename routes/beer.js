
/*
 * GET beers listing.
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/mongoose-test');
var db = mongoose.connection;

var BeerSchema = new Schema({
  name: { type: String, default: '' },
  category: { type: String, default: ''},
});

var Beer = mongoose.model('Beer', BeerSchema);

var dados = {
	name: 'Itaipava',
	category: 'pilsen'
}

var beer = new Beer(dados);


exports.list = function(req, res){

	Beer.find(function (err, beers) {
		if(err) {
			console.log('Deu Merda', err);
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
			console.log('Deu certo');
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
			console.log('Breja atualizada');
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
			console.log('Breja Deletada');
		}
	});

	res.end();
};

// Expose
exports.index = function(req, res){
	res.render('/beers/index');
};