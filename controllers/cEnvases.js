//requiriendo modelo mensaje.js:
var mEnvases = require('../models/mEnvases');
var mUmed = require('../models/mUmed');
var mBorro = require('../models/mBorro');
var mVerificacion = require('../models/mVerificacion');
var mAyuda = require('../models/mAyuda');

module.exports = {
	getAll: getAll,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel,
	getCapacidad: getCapacidad
};

function getAll(req, res) {
	req.session.nromenu = 5;
  	mAyuda.getAyudaTexto(req.session.nromenu, function (ayuda){
  		mEnvases.getAll(function (envases){
			mUmed.getAllActivas(function (umeds){
				res.render('envaseslista', {
					pagename: 'Archivo de Envases',
					envases: envases,
					umeds: umeds,
					ayuda: ayuda[0]
				});
			});
		});
 	});	
}

function getAlta(req, res){
	mUmed.getAllActivas(function (umeds){
		res.render('envasesalta', {
			pagename: 'Alta de Envases',
			umeds: umeds
		});
	});
	
}

function postAlta(req, res){
	params= req.body;
	codigo = params.codigo;
	nombre = params.nombre;
	umed = params.umed;
	capacidad = params.capacidad;
	uxpallet = params.uxpallet;
	activo = 1;

	mEnvases.insert(codigo, nombre, umed, capacidad, uxpallet, activo, function(){
		res.redirect('envaseslista');
	})

}

function getModificar(req, res){
	params = req.params;
	id = params.id;
	mUmed.getAllActivas(function (umeds){
		mEnvases.getEnvasePorId(id, function (envase){
			res.render('envasesmodificar', {
				pagename: 'Modificar Envase',
				envase: envase[0],
				umeds: umeds
			});
		});
	});	
}

function postModificar(req, res){
	params = req.body;
	id = params.id;
	codigo = params.codigo;
	nombre = params.nombre;
	umed = params.umed;
	capacidad = params.capacidad;
	uxpallet = params.uxpallet;
	activo = params.activa;

	if (activo=="on")
		activo= 1;
	else
		activo=0;

	mEnvases.update(id, codigo, nombre, umed, capacidad, uxpallet, activo, function(){
		res.redirect('/envaseslista');
	});
}

function getDel(req, res){
	params = req.params;
	id = params.id;

	mVerificacion.getEnvaseFromRemito(id, function (envaseFromRemito){
		if (envaseFromRemito[0] != null){
			res.render('error', {
		        error: "No puede eliminar este envase, posee movimientos."
		      });
		}else{
			mEnvases.getEnvasePorId(id, function (envase){
				envase = envase[0];
				mBorro.add(req.session.user.usuario, "Envases", "Borra nombre: "+ envase.nombre+", id: "+id, function(){
					mEnvases.del(id, function(){
						res.redirect('/envaseslista');
					});
				});
			});
		}
	});
}

function getCapacidad(req, res){
	params = req.params;
  	idenvase = params.id;
  	mEnvases.getEnvasePorId(idenvase, function (envase){
    	res.send(envase[0]);
	});
}