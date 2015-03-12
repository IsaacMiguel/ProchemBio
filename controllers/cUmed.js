//requiriendo modelo mensaje.js:
var mUmed = require('../models/mUmed');
var mBorro = require('../models/mBorro');
var mVerificacion = require('../models/mVerificacion');
var mAyuda = require('../models/mAyuda');

module.exports = {
	getAllUmed: getAllUmed,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDelUmed: getDelUmed
};

function getAllUmed(req, res) {
	req.session.nromenu = 3;
  	mAyuda.getAyudaTexto(req.session.nromenu, function(ayuda){
	  	mUmed.getAll(function(docs){
	  		console.log(docs)
	  		res.render('umedlista', {
				pagename: 'Unidades de Medida',
				umeds: docs,
				ayuda: ayuda[0]
			});
	  	});
  	});
}

function getAlta(req, res){
	res.render('umedalta', {
		pagename: 'Alta de Unidades de Medida',
	});
}

function postAlta(req, res){
	params = req.body;
	codigo= params.codigo;
	nombre = params.nombre;
	mUmed.getUmedPorCodigo(codigo, function(docs){
		if (docs[0]==null){
			mUmed.insertUmed(codigo, nombre, function(){
				res.redirect('umedlista');
			});
		}else{
			res.render('error', {
      			error: "Codigo de Unidad de Medida existente. Intente con otro Codigo de Unidad de Medida."
      		});
      	}
	});
}

function getModificar(req, res){
	params = req.params;
	id = params.id;
	mUmed.getUmedPorId(id, function(docs){
		res.render('umedmodificar',{
			pagename: 'Modificar Unidad de Medida',
			umed: docs[0]
		});
	});
}

function postModificar(req, res){
	params = req.body;
	id = params.id;
	codigo = params.codigo;
	nombre = params.nombre;
	activo = params.activo;
	if (activo == "on")
		activo = 1;
	else
		activo = 0;

	mUmed.updateUmed(id, codigo, nombre, activo, function(){
		res.redirect('umedlista');
	});
}

function getDelUmed(req, res){
  	var params = req.params;
  	var id = params.id;
  	mUmed.getUmedPorId(id, function (umed){
  		umed = umed[0];
  		mVerificacion.getUmedFromProduc(umed.codigo, function (umedFromProduc){
  			if (umedFromProduc[0] != null){
  				res.render('error', {
		    	    error: "No puede eliminar esta unidad de medida, posee movimientos."
		    	});
  			}else{
  				mVerificacion.getUmedFromMatep(umed.codigo, function (umedFromMatep){
  					if (umedFromMatep[0] != null){
  						res.render('error', {
					        error: "No puede eliminar esta unidad de medida, posee movimientos."
					    });	
  					}else{
  						mVerificacion.getUmedFromFormulados(umed.codigo, function (umedFromFormulados){
  							if(umedFromFormulados[0] != null){
  								res.render('error', {
							        error: "No puede eliminar esta unidad de medida, posee movimientos."
							    });
  							}else{
  								mVerificacion.getUmedFromEnvases(umed.id, function (umedFromEnvases){
  									if(umedFromEnvases[0] != null){
  										res.render('error', {
									        error: "No puede eliminar esta unidad de medida, posee movimientos."
									    });
  									}else{
  										mVerificacion.getUmedFromTanques(umed.codigo, function (umedFromTanques){
  											if(umedFromTanques[0] != null){
  												res.render('error', {
											        error: "No puede eliminar esta unidad de medida, posee movimientos."
											    });
  											}else{
  												mBorro.add(req.session.user.usuario,"Umed", "Borra Nombre Umed: "+ umed.nombre + ", id: " + id ,function(){
									    	  		mUmed.delUmed(id, function(){
											    		res.redirect('/umedlista'); 
											  		});
							   	 				});
  											}
  										});
  									}
  								});
  							}
  						});
  					}
  				});
  			}
  		});
  	}); 
}
