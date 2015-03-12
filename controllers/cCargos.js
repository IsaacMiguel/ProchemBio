var mCargo = require('../models/mCargos');
var mBorro = require('../models/mBorro');

module.exports = {
	getAllCargos: getAllCargos,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDelCargo: getDelCargo
};

function getAllCargos(req, res) {
  	mCargo.getAll(function(docs){
  		res.render('Cargoslista', {
			pagename: 'Cargos de Empleados',
			cargos: docs,
		});
  	});
}

function getAlta(req, res){
	res.render('Cargosalta', {
		pagename: 'Alta de Cargos',
	});
}


function postAlta(req, res){
	params = req.body;
	//console.log(req.body)
	//codigo= params.codigo;
	descripcion = params.descripcion;
	activa = "on";
	if (activa=="on")
		activa = 1;
	else
		activa = 0;

	mCargo.insertCargo(descripcion, activa, function(){
		res.redirect('Cargoslista');
	})
}

function getModificar(req, res){
	params = req.params;
	id = params.id;
	mCargo.getCargoPorId(id, function(docs){
		res.render('Cargosmodificar',{
			pagename: 'Modificar Cargo',
			cargo: docs[0]
		});
	});
}

function postModificar(req, res){
	params = req.body;
	id = params.id;
	descripcion = params.descripcion;
	activa = params.activa;
	if (activa=="on")
		activa = 1;
	else
		activa = 0;

	mCargo.updateCargo(id, descripcion, activa, function(){
		res.redirect('Cargoslista');
	});
}

function getDelCargo(req, res){
  	var params = req.params;
  	var id = params.id;

  	mCargo.getCargoPorId(id, function(docs){
  		cargo = docs[0];
		mBorro.add(req.session.user.usuario,"Cargos", "Borra descripcion: "+ cargo.descripcion + ", id: " + id , function(){
			mCargo.delCargo(id, function(){
				res.redirect('/Cargoslista'); 
			});
		});
  	});  
}