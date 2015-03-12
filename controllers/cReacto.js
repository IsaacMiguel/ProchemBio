//requiriendo modelo mensaje.js:
var mReacto = require('../models/mReacto');
var mEmple = require('../models/mEmple');
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
	req.session.nromenu = 8;
  	mAyuda.getAyudaTexto(req.session.nromenu, function(ayuda){
		mReacto.getAll(function(reactores){
	  		res.render('reactolista', {
				pagename: 'Archivo de Reactores',
				reactores: reactores,
				ayuda: ayuda[0]
			});
	  	});
  	});
}

function getAlta(req, res){
	res.render('reactoalta', {
		pagename: 'Alta de Reactor'
	});
}

function postAlta(req, res){
	params = req.body;
	codigo = params.codigo;
	nombre = params.nombre;
	capacidad = params.capacidad;
	if (capacidad == "")
		capacidad = 0

	mReacto.insert(codigo, nombre, capacidad, function(){
		res.redirect('reactolista');
	});
}

function getModificar(req, res){
	params = req.params;
	id = params.id;
	mReacto.getReactoPorId(id, function(reactor){
		res.render('reactomodificar', {
			pagename: 'Modificar Reactor',
			reactor: reactor[0]
		});
	});
}

function postModificar(req, res){
	params = req.body;
	id = params.id;
	codigo = params.codigo;
	nombre = params.nombre;
	capacidad = params.capacidad;
	if (capacidad == "")
		capacidad = 0;
	activa = params.activa;
	if (activa == "on")
		activa = 1;
	else
		activa = 0;

	mReacto.update(id, codigo, nombre, capacidad, activa, function(){
		res.redirect('reactolista');
	})
}

function getDel(req, res){
	params = req.params;
	id = params.id;

	mReacto.getReactoPorId(id, function(reacto){
		reacto= reacto[0];
		mBorro.add(req.session.user.usuario,"Reactores", "Borra Nombre Reactor: "+ reacto.nombre + ", id: " + id ,function(){
			mReacto.del(id, function(){
				res.redirect('/reactolista');
			});
		});
	});	
}

