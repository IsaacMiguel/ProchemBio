var mNaves = require('../models/mNaves');

module.exports = {
	getLista: getLista
};

function getLista(req, res) {
	mNaves.getAll(function (naves){
		res.render('naveslista', {
			pagename: "Lista de Naves",
			naves: naves
		});
	});
}