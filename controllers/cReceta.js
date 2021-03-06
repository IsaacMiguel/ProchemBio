//requiriendo modelo mensaje.js:
var mReceta = require('../models/mReceta');
var mFormulado = require('../models/mFormulados');
var mMatep = require('../models/mMatep');
var mClientes = require('../models/mClientes');
var mBorro = require('../models/mBorro');

module.exports = {
	getRecetaPorFormulado: getRecetaPorFormulado,
	getAlta: getAlta,
	postAlta: postAlta,
	getDel: getDel,
	getModificar: getModificar,
	postModificar: postModificar
};

function getRecetaPorFormulado(req, res) {
	params = req.params;
	id = params.id;
	mReceta.getRecetaPorIdFormulado(id, function (recetas){
		mFormulado.getFormuladoPorId(id, function (formulado){
			//console.log(formulado)
			mFormulado.getcdClientePorIdFormulado(id, function (cdcliente){
				mClientes.getClientePorID(cdcliente[0].cdcliente,function (cliente){
					mMatep.getAllActivasPorCliente(cdcliente[0].cdcliente, function (mateps){
						res.render('recetalista',{
							pagename: 'Formula de ',
							recetas: recetas,
							formulado: formulado[0],
							cliente: cliente[0],
							mateps: mateps
						});
					});
				});				
			});			
		});
	});
}

function getAlta(req, res) {
	params = req.params;
	id = params.id;//id del Formulado
	mFormulado.getFormuladoPorId(id, function (formulado){
		mFormulado.getcdClientePorIdFormulado(id, function (cliente){
			mMatep.getAllActivasPorCliente(cliente[0].cdcliente, function (mateps){
				res.render('recetaalta',{
					pagename: 'Alta de Formula',
					mateps: mateps,
					formulado: formulado[0]
				});
			});
		});
	});	
}

function postAlta(req, res) {
	params = req.body;
	idFormulado = params.idproducto;
	matep = params.matep;
	porcentaje = params.porcentaje;
	formula = params.formula;
	//soloporce = params.soloporce;
	//if (soloporce == "on")
	soloporce = 1;
	//else
	//	soloporce = 0;
	usalote = params.usalote;
	orden = params.orden;

	if (usalote == "on")
		usalote=1;
	else
		usalote=0;
	if (porcentaje <= 100){
		mReceta.insert(idFormulado, matep, porcentaje, formula, soloporce, usalote, orden, function(){
			res.redirect('/recetalista/'+ idFormulado);
		});
	}else{
		res.render('error', {
	        error: "El Porcentaje no puede ser mayor a 100."
	    });
	}
}

function getDel(req, res){
	params = req.params;
	id = params.id;
	mReceta.getRecetaPorId(id, function (receta){
		receta = receta[0];
		mReceta.getFormuladoIdPorIdReceta(id, function (Formulado){
		    mBorro.add(req.session.user.usuario,"Recetas", "Borra Nombre Receta: "+ receta.nombre + ", id: " + id ,function(){
				mReceta.del(id, function(){
					res.redirect('/recetalista/'+ Formulado[0].producid);
				});
		    });
		});
	});
}

function getModificar(req, res){
	params = req.params;
	id = params.id;

	mReceta.getRecetaPorId(id, function (Receta){
		mMatep.getAllActivas(function (mateps){
			//console.log(Receta[0])
			res.render('recetamodificar',{
				pagename: 'Modificar Elemento de Formula',
				receta: Receta[0],
				mateps: mateps,
				id: id
			});
		});
	});
}

function postModificar(req, res){
	params = req.body;
	id = params.id;
	matepid = params.matepid;
	idprod = params.idproducto;
	//console.log(idprod)
	porcentaje = params.porcentaje;
	usalote = params.usalote;
	orden = params.orden;

	if (usalote == "on")
		usalote = 1
	else
		usalote = 0
	
	mReceta.updatePorceYUsaLote(id, porcentaje, usalote, orden, function(){
		mReceta.getRecetaPorIdFormulado(idprod, function (recetas){
			mFormulado.getFormuladoPorId(idprod, function (formulado){
				//console.log(formulado)
				mFormulado.getcdClientePorIdFormulado(idprod, function (cdcliente){
					mClientes.getClientePorID(cdcliente[0].cdcliente,function (cliente){
						mMatep.getAllActivasPorCliente(cdcliente[0].cdcliente, function (mateps){
							res.render('recetalista',{
								pagename: 'Formula de ',
								recetas: recetas,
								formulado: formulado[0],
								cliente: cliente[0],
								mateps: mateps
							});
						});
					});				
				});			
			});
		});
	});
}