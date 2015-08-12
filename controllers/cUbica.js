//requiriendo modelo mensaje.js:
var mUbica = require('../models/mUbica');
var mBorro = require('../models/mBorro');
var mVerificacion = require('../models/mVerificacion');
var mAyuda = require('../models/mAyuda');
var mNaves = require('../models/mNaves');

module.exports = {
	getAll: getAll,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel
};

function getAll(req, res) {
	req.session.nromenu = 6;
  	mAyuda.getAyudaTexto(req.session.nromenu, function (ayuda){
	  	mUbica.getAll(function (ubicas){
	  		res.render('ubicalista', {
				pagename: 'Archivo de Ubicaciones de Planta',
				ubicas: ubicas,
				ayuda: ayuda[0]
			});
	  	});
  	});
}

function getAlta(req, res){
	mNaves.getAll(function (naves){
		res.render('ubicaalta', {
			pagename: 'Alta de Ubicaciones',
			naves: naves
		});
	});
}

function postAlta(req, res){
	params = req.body;
	//console.log(params)
	nombre = params.nombre;
	codigo = params.codigo;
	activa = 1;
	nave = params.nave;
	alto = params.alto;
	ancho = params.ancho;
	coordx = params.coordx;
	coordy = params.coordy;
	red = params.colorr;
	green = params.asdf;
	blue = params.colorb;

	mUbica.insert(codigo, nombre, activa, nave, alto, ancho, coordx, coordy, red, green, blue, function(){
		res.redirect('ubicalista');
	})
}

function getModificar(req, res){
	params = req.params;
	id = params.id;
	mNaves.getAll(function (naves){
		mUbica.getUbicaPorId(id, function (ubica){
			res.render('ubicamodificar',{
				pagename: 'Modificar Ubicacion',
				ubica: ubica[0],
				naves: naves
			});
		});
	});
}

function postModificar(req, res){
	params = req.body;
	//console.log(params)
	id = params.id;
	codigo = params.codigo;
	nombre = params.nombre;
	activa = params.activa;
	if (activa=="on")
		activa = 1;
	else
		activa = 0;
	nave = params.nave;
	alto = params.alto;
	ancho = params.ancho;
	coordx = params.coordx;
	coordy = params.coordy;
	red = params.colorr;
	green = params.asdf;
	blue = params.colorb;

	mUbica.update(id, codigo, nombre, activa, nave, alto, ancho, coordx, coordy, red, green, blue, function(){
		res.redirect('/ubicalista');
	});
}

function getDel(req, res){
  	var params = req.params;
  	var id = params.id;

  	mVerificacion.getUbicaFromRemito(id, function(ubicaFromRemito){
  		if (ubicaFromRemito[0] != null){
  			res.render('error', {
		        error: "No puede eliminar esta ubicacion, posee movimientos."
		     });
  		}else{
			mUbica.getUbicaPorId(id, function(ubica){
		  		ubica = ubica[0];
		  		mBorro.add(req.session.user.usuario,"Ubicaciones", "Borra Nombre de Ubica: "+ ubica.nombre + ", id: " + id ,function(){
			      	mUbica.del(id, function(){
				  	  	res.redirect('/ubicalista'); 
				  	});
			    });
		  	});
  		}
  	});  	
}
