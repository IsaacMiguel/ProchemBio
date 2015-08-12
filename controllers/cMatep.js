//requiriendo modelo mensaje.js:
var mMatep = require('../models/mMatep');
var mClientes = require('../models/mClientes');
var mUmed = require('../models/mUmed');
var mBorro = require('../models/mBorro');
var mVerificacion = require('../models/mVerificacion');
var mAyuda = require('../models/mAyuda');
var mEnvases = require('../models/mEnvases');

module.exports = {
	getAllMatepPorCliente: getAllMatepPorCliente,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDelMatep: getDelMatep,
};

function getAllMatepPorCliente(req, res) {
	req.session.nromenu = 15;
	params = req.params;
	cdcliente = params.cdcliente
	mMatep.getAllMatepPorCliente(cdcliente, function (allmatepporcliente){
		mClientes.getNombreDeClientePorId(cdcliente, function (nombredecliente){
			mAyuda.getAyudaTexto(req.session.nromenu, function (ayuda){
				res.render('mateplista',{
					pagename: 'Archivo de Materias Primas ',
					mateps: allmatepporcliente,
					cdcliente2: cdcliente,
					nombredecliente: nombredecliente[0],
					ayuda: ayuda[0]
				});
			});
		});
		
	});
}

function getAlta(req, res){
	params = req.params;
	cdcliente = params.cdcliente;
	mUmed.getAllActivas(function (unidadesdemedida){
		mEnvases.getAll(function (envases){
				res.render('matepalta', {
				pagename: 'Alta de Materia Prima',
				cdcliente: cdcliente,
				envases: envases,
				umeds: unidadesdemedida
			});
		});
	});
}

function postAlta(req, res){
	params = req.body;
	codigo = params.codigo;
	umed = params.umed;
	cdcliente = params.cdcliente;
	nombre = params.nombre;
	pactivo = params.pactivo;
	usacinta = params.cinta;
<<<<<<< HEAD
	envase = params.envase;

	if (pactivo == "on" ){
=======

	if (pactivo == "on" )
>>>>>>> a8d09aced25bd8a7b271db0d50940cb8a5a067aa
		pactivo = 1;
		envase = 0;
	}else{
		pactivo = 0;
	}
	if (usacinta == "on")
		usacinta = 1;
	else
<<<<<<< HEAD
=======
		pactivo = 0;
	if (usacinta == "on")
		usacinta = 1;
	else
>>>>>>> a8d09aced25bd8a7b271db0d50940cb8a5a067aa
		usacinta = 0;
	mMatep.getMatepPorCodigoParaCadaCliente(codigo, cdcliente, function (docs){
    	if(docs[0]==null){
      		//si no hay coincidencias
      		mMatep.getMatepPorNombreParaCadaCliente(nombre, cdcliente, function (docs2){
      			if (docs2[0]==null){
<<<<<<< HEAD
	      			mMatep.insertMatep(codigo, cdcliente, umed, nombre, pactivo, usacinta, envase, function(){
=======
	      			mMatep.insertMatep(codigo, cdcliente, umed, nombre, pactivo, usacinta, function(){
>>>>>>> a8d09aced25bd8a7b271db0d50940cb8a5a067aa
						res.redirect('mateplista/'+ cdcliente);
					});
	      		}
      			else{
      				res.render('error', {
      					error: "Nombre de Materia Prima existente para este cliente. Intente con otro Nombre de Materia Prima."
      				});
      			}
      		});      		
   		}else{
	      	//si hay coincidencias ->error
	      	res.render('error', {
	       		error: "Codigo de Materia Prima existente para este cliente. Intente con otro Codigo de Materia Prima."
	      	});
    	}
  	});	
}

function getModificar(req, res){
	params = req.params;
	id = params.id;
	mMatep.getMatepPorId(id, function (matep){
		mUmed.getAllActivas(function (umeds){
			mEnvases.getAll(function (envases){
					res.render('matepmodificar',{
					pagename: 'Modificar Materia Prima',
					matep: matep[0],
					umeds: umeds,
					envases: envases
				});
			});
		});
	});
}

function postModificar(req, res){
	params = req.body;
	id = params.id;
	codigo = params.codigo;
	cdcliente = params.cdcliente;
	nombre = params.nombre;
	activo = params.activo;
	pactivo = params.pactivo;
	umed = params.umed;
	usacinta = params.usacinta;
	envase = params.envase;

	if (pactivo == "on"){
		pactivo = 1;
		envase = 0;
	}else{
		pactivo = 0;
	}

	if (activo =="on")
		activo = 1;
	else
		activo = 0;
	
	if (usacinta == "on") 
		usacinta = 1;
	else
		usacinta = 0;
<<<<<<< HEAD




	mMatep.verificacionCodigos(id, codigo, function (verificacion){
		if (verificacion[0]==null){
			mMatep.updateMatep(id, cdcliente, codigo, nombre, activo, pactivo, umed, usacinta, envase, function(){
=======

	mMatep.verificacionCodigos(id, codigo, function (verificacion){
		if (verificacion[0]==null){
			mMatep.updateMatep(id, cdcliente, codigo, nombre, activo, pactivo, umed, usacinta, function(){
>>>>>>> a8d09aced25bd8a7b271db0d50940cb8a5a067aa
				res.redirect('mateplista/'+ cdcliente);
			});
		}else{
			res.render('error', {
       			error: "Codigo de Materia Prima existente para este cliente. Intente con otro Codigo de Materia Prima."
      		});
		}
	});	
}

function getDelMatep(req, res){
	params = req.params;
	id = params.id;

	mVerificacion.getMatepFromRemito(id, function (matepFromRemito){
		if (matepFromRemito[0] != null){
			 res.render('error', {
		        error: "No puede eliminar esta materia prima, posee movimientos."
		      });
		}else{
			mVerificacion.getMatepFromReceta(id, function (matepFromReceta){
				if (matepFromReceta[0] != null){
					res.render('error', {
				    	error: "No puede eliminar esta materia prima, posee movimientos."
				    });
				}else{
					mVerificacion.getMatepFromConsumibles(id, function (matepFromConsumibles){
						if(matepFromConsumibles[0]){
							res.render('error', {
						    	error: "No puede eliminar esta materia prima, posee movimientos."
						    });	
						}else{
							mMatep.getMatepPorId(id, function(docs){
								cdcliente= docs[0].cdcliente;
								matep = docs[0];
							    mBorro.add(req.session.user.usuario,"Materia Prima", "Borra Nombre MAtep: "+ matep.nombre + ", id: " + id ,function(){
									mMatep.delMatep(id, function(){
										res.redirect('/mateplista/'+ cdcliente)
									});
								});		
							});	
						}
					});
				}
			});
		}
	});	
}
