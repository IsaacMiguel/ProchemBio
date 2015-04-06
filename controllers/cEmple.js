var mEmple = require('../models/mEmple');
var mCargos = require('../models/mCargos');
var mBorro = require('../models/mBorro');
var mAyuda = require('../models/mAyuda');

module.exports = {
	getEmpleados: getEmpleados,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDelEmple: getDelEmple
};

function changeDate(date){
	// input: dd/mm/yyyy
	fechaus = date.substring(6,10) + "/" + date.substring(3,5) + "/" + date.substring(0,2);
	return fechaus;
	// output: yyyy/mm/dd
}

function getEmpleados(req, res) {
	req.session.nromenu = 4;
  	mAyuda.getAyudaTexto(req.session.nromenu, function (ayuda){
	  	mCargos.getAll(function (docs){
	  		mEmple.getAllActivos(function (docs2){
	  			res.render('emplelista', {
					pagename: 'Archivo de Empleados',
					cargos: docs,
					empleados: docs2,
					ayuda: ayuda[0]
				});
	  		});
	  	});
  	});
}

function getAlta(req, res){
	mCargos.getAllActivos(function (docs){
		mEmple.getUltimo(function (docs2){
			if(docs[0].max==null)
				res.render('emplealta', {
					pagename: 'Alta de Empleados',
					cargos: docs,
					cdmax: 1
				});
			else
				res.render('emplealta', {
					pagename: 'Alta de Empleados',
					cargos: docs,
					cdmax: docs2[0].max +1
				});
		});
	});	
}

function postAlta(req, res){
	params = req.body;
	codigo = params.codigo;
	nombre = params.nombre;
	falta = params.falta;
	fbaja = params.fbaja;
	cargo = params.cargo;
	falta = changeDate(falta);
	fbaja = changeDate(fbaja);

	mEmple.insert(codigo, nombre, falta, fbaja, cargo, 1, function(){
		res.redirect('emplelista');
	})
}	

function getModificar(req, res){
	params = req.params;
	codigo= params.codigo;
	mEmple.getEmplePorCodigo(codigo, function (docs){
		mCargos.getAll(function (cargos){
			res.render('emplemodificar', {
				pagename: 'Modificar Empleado',
				emple: docs[0],
				cargos: cargos
			});
		});
	});
}

function postModificar(req, res){
	params = req.body;
	//console.log(params)
	codigo = params.codigo;
	nombre = params.nombre;
	falta = params.falta;
	fbaja =  params.fbaja;
	cargo = params.cargo;
	activo = params.activa;
	if (activo=='on')
		activo=1
	else
		activo=0
	falta = changeDate(falta);
	fbaja = changeDate(fbaja);
	mEmple.update(codigo, nombre, falta, fbaja, cargo, activo, function(){
		res.redirect('/emplelista');
	})
}

function getDelEmple(req, res){
  var params = req.params;
  var codigo = params.codigo;

  mEmple.getEmplePorCodigo(codigo, function (docs){
  	emple = docs[0];
  	mBorro.add(req.session.user.usuario,"Empleados", "Borra Nombre de Empleado: "+ emple.nombre + ", id: "+ emple.codigo, function(){
  		mEmple.delEmple(codigo, function(){
	    	res.redirect('/emplelista'); 
	  	});
  	});	
  });  
}