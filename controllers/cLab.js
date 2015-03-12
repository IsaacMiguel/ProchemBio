var mCargo = require('../models/mCargos');
var mBorro = require('../models/mBorro');
var mRemitos = require('../models/mRemitos');
var mMatep = require('../models/mMatep');
var mClientes = require('../models/mClientes');
var mEnvases = require('../models/mEnvases');
var mUbica = require('../models/mUbica');
var mTipos = require('../models/mTipos');
var mMovi = require('../models/mMovi');
var mLab = require('../models/mLab');

module.exports = {
	getLab: getLab,
	postLab: postLab
};

function getLab(req, res) {
	params = req.params;
	id = params.idremito;

	mMatep.getAllActivas(function(mateps){
		mClientes.getAllActivos(function(clientes){
			console.log(clientes)
			mEnvases.getAllActivos(function(envases){
				mUbica.getAllActivos(function(ubicaciones){
					mRemitos.getRemitoPorId(id, function(remito){
						console.log(remito)
						mTipos.getAll(function(tipos){
							console.log(tipos)
							mCargo.getAll(function(docs){
						  		res.render('lab', {
									pagename: 'Laboratorio',
									cargos: docs,
									tipos: tipos,
									remito: remito[0],
									ubicaciones: ubicaciones,
									envases: envases,
									clientes: clientes,
									mateps: mateps
								});
						  	});
						});
					});
				});
			});
		});
	});
}

function postLab(req, res){
	params = req.body;
	//console.log(params)
	id = params.id;
	conceori = params.conceori;
	concepla = params.concepla;

	mLab.insert(id, conceori, concepla, function(){
		res.redirect('/remitoslista');
	})
}