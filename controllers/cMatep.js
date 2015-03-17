//requiriendo modelo mensaje.js:
var mMatep = require('../models/mMatep');
var mClientes = require('../models/mClientes');
var mUmed = require('../models/mUmed');
var mBorro = require('../models/mBorro');
var mVerificacion = require('../models/mVerificacion');
var mAyuda = require('../models/mAyuda');

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
		res.render('matepalta', {
			pagename: 'Alta de Materia Prima',
			cdcliente: cdcliente,
			umeds: unidadesdemedida
		});
	});
}

function postAlta(req, res){
	params = req.body;
	console.log(params)
	codigo = params.codigo;
	umed = params.umed;
	cdcliente = params.cdcliente;
	nombre = params.nombre;
	pactivo = params.pactivo;

	if (pactivo == "on")
		pactivo = 1;
	else
		pactivo=0;
	if(pactivo==1)
		concentracion = params.concentracion;
	else
		concentracion = 0;
	if (concentracion<100.01){
		mMatep.getMatepPorCodigoParaCadaCliente(codigo, cdcliente, function (docs){
	    	if(docs[0]==null){
	      		//si no hay coincidencias
	      		mMatep.getMatepPorNombreParaCadaCliente(nombre, cdcliente, function (docs2){
	      			if (docs2[0]==null){
		      			mMatep.insertMatep(codigo, cdcliente, umed, nombre, pactivo, concentracion, function(){
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
	}else{
		res.render('error',{
			error: "La concentracion no puede ser mayor a 100."
		});
	}	
}

function getModificar(req, res){
	params = req.params;
	id = params.id;
	mMatep.getMatepPorId(id, function (docs){
		res.render('matepmodificar',{
			pagename: 'Modificar Materia Prima',
			matep: docs[0]
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
	concentracion = params.concentracion;

	if (pactivo == "on")
		pactivo = 1;
	else
		pactivo = 0;

	if (activo =="on")
		activo = 1;
	else
		activo = 0;
	if (concentracion.length == 0)
		concentracion = 0;
	if (concentracion<100.01){
		mMatep.verificacionCodigos(id, codigo, function (verificacion){
			if (verificacion[0]==null){
				mMatep.updateMatep(id, cdcliente, codigo, nombre, activo, pactivo, concentracion, function(){
					res.redirect('mateplista/'+ cdcliente);
				});
			}else{
				res.render('error', {
	       			error: "Codigo de Materia Prima existente para este cliente. Intente con otro Codigo de Materia Prima."
	      		});
			}
		});
	}else{
		res.render('error', {
			error: 'La Concentracion no puede ser mayor a 100.'
		});
	}	
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
