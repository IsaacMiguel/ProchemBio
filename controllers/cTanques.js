//requiriendo modelo mensaje.js:
var mTanque = require('../models/mTanques');
var mUmed = require('../models/mUmed');
var mBorro = require('../models/mBorro');
var mAyuda = require('../models/mAyuda');

module.exports = {
	getAll: getAll,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel
};

function getAll(req, res) {
	req.session.nromenu = 9;
  	mAyuda.getAyudaTexto(req.session.nromenu, function(ayuda){
	  	mTanque.getAll(function(tanques){
	  		res.render('tanqueslista', {
				pagename: 'Archivo de Tanques',
				tanques: tanques,
				ayuda: ayuda[0]
			});
	  	});
  	});
}

function getAlta(req, res){
	mUmed.getAllActivas(function(umeds){
		res.render('tanquesalta',{
			pagename: 'Alta de Tanques',
			umeds: umeds
		});
	});
}

function postAlta(req, res){
	params = req.body;
	codigo = params.codigo;
	nombre = params.nombre;
	umed = params.umed;
	capacidad = params.capacidad;
	if (capacidad=="")
		capacidad = 0
	activa = 1;

	mTanque.insert(codigo, nombre, umed, capacidad, activa, function(){
		res.redirect('/tanqueslista');
	});
}

function getModificar(req, res){
	params = req.params;
	id = params.id;
	mUmed.getAllActivas(function(umeds){
		mTanque.getTanquePorId(id, function(tanque){
			res.render('tanquesmodificar', {
				pagename: 'Modificar Tanque',
				tanque: tanque[0],
				umeds: umeds
			});
		});
	});	
}

function postModificar(req, res){
	params = req.body;
	id = params.id;
	nombre = params.nombre;
	codigo = params.codigo;
	umed = params.umed;
	capacidad = params.capacidad;
	activa = params.activa;
	if (activa == "on")
		activa = 1
	else
		activa = 0
	mTanque.update(id, codigo, nombre, umed, capacidad, activa, function(){
		res.redirect('/tanqueslista');
	});
}

function getDel(req, res){
	params = req.params;
	id = params.id;
	mTanque.getTanquePorId(id, function(tanque){
		tanque = tanque[0];
		mBorro.add(req.session.user.usuario,"Tanques", "Borra Nombre Tanque: "+ tanque.nombre + ", id: " + id ,function(){
	      	mTanque.del(id, function(){
				res.redirect('/tanqueslista');
			});
	    });
	});	
}
