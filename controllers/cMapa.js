var mMapa = require('../models/mMapa');
var mNaves = require('../models/mNaves');
var mUbica = require('../models/mUbica');

module.exports = {
	getMapa: getMapa
};

function getMapa(req, res) {
	mNaves.getAll(function (naves){
		mUbica.getAllActivos(function (ubicas){
			//console.log(ubicas)

			filas = naves[0].filas;
			cols = naves[0].columnas;

  		res.render('mapaver', {
			  pagename: 'Mapa',
				filas: filas,
				cols: cols,
				ubicas: ubicas
			});
		});
	});
}