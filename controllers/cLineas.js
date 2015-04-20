var mLineas = require('../models/mLineas');
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
	req.session.nromenu = 7;
  	mAyuda.getAyudaTexto(req.session.nromenu, function(ayuda){
	  	mLineas.getAll(function(lineas){
	  		res.render('lineaslista', {
				pagename: 'Archivo de Lineas de Fraccionado',
				lineas: lineas,
				ayuda: ayuda[0]
			});
	  	});	
  	});
}

function getAlta(req, res){
	res.render('lineasalta', {
		pagename: 'Alta de Linea'
	});
}

function postAlta(req, res){
	params = req.body;
	codigo = params.codigo;
	nombre = params.nombre;

	mLineas.insert(codigo, nombre, function(){
		res.redirect('lineaslista');
	});
}


function getModificar(req, res){
	params = req.params;
	id = params.id;
	mLineas.getLineaPorId(id, function(linea){
		res.render('lineasmodificar', {
			pagename: 'Modificar Linea',
			linea: linea[0]
		});
	});
}

function postModificar(req, res){
	params = req.body;
	id = params.id;
	codigo = params.codigo;
	nombre = params.nombre;
	activa = params.activa;
	if (activa == "on")
		activa = 1;
	else
		activa = 0;

	mLineas.update(id, codigo, nombre, activa, function(){
		res.redirect('lineaslista');
	})
}

function getDel(req, res){
	params = req.params;
	id = params.id;
	mLineas.getLineaPorId(id, function(linea){
		linea=linea[0];
		mBorro.add(req.session.user.usuario,"Lineas", "Borra Nombre Linea: "+ linea.nombre + ", id: " + id ,function(){
			mLineas.del(id, function(){
				res.redirect('/lineaslista');
			});
		});			
	});
}
