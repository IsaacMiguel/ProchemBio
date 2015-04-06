//requiriendo modelo mensaje.js:
var mFormulado = require('../models/mFormulados');
var mClientes = require('../models/mClientes');
var mUmed = require('../models/mUmed');
var mBorro = require('../models/mBorro');
var mVerificacion = require('../models/mVerificacion');

module.exports = {
	getAllFormuladoPorCliente: getAllFormuladoPorCliente,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDelFormulado: getDelFormulado,
	getForms: getForms,
	getAbLote: getAbLote
};

function getAllFormuladoPorCliente(req, res) {
	params = req.params;
	cdcliente = params.cdcliente
	mFormulado.getAllFormuladoPorCliente(cdcliente, function (docs){
		//console.log(docs)
		mClientes.getNombreDeClientePorId(cdcliente, function (nombredecliente){
			res.render('formuladolista',{
				pagename: 'Archivo de Formulados',
				forms: docs,
				cdcliente2: cdcliente,
				nombredecliente: nombredecliente[0]
			});
		});
	});
}

function getAlta(req, res){
	params = req.params;
	cdcliente = params.cdcliente;
	mUmed.getAllActivas(function (unidadesdemedida){
		res.render('formuladoalta', {
			pagename: 'Alta de Formulado',
			cdcliente: cdcliente,
			umeds: unidadesdemedida
		});
	});
}

function postAlta(req, res){
	params = req.body;
	codigo = params.codigo;
	umed = params.umed;
	cdcliente = params.cdcliente;
	nombre = params.nombre;
	lote = params.lote;
	concentracion = params.concentracion;

	mFormulado.getFormuladoPorCodigoParaCadaCliente(codigo, cdcliente, function (docs){
		console.log(docs[0].cantidad)
    	if(docs[0].cantidad==0){
      		//si no hay coincidencias
      		mFormulado.getFormuladoPorNombreParaCadaCliente(nombre, cdcliente, function (docs2){
      			if (docs2[0]==null)
      			mFormulado.insertFormulado(codigo, cdcliente, lote, umed, nombre, concentracion, function(){
					res.redirect('formuladolista/'+ cdcliente);
				});
      			else
      				res.render('error', {
      					error: "Nombre de Formulado existente para este cliente. Intente con otro Nombre de Formulado."
      				});
      		});      		
   		}else{
      	//si hay coincidencias ->error
	      	res.render('error', {
	       		error: "Codigo de Formulado existente para este cliente. Intente con otro Codigo de Formulado."
	      	});
    	}
  	});
}

function getModificar(req, res){
	params = req.params;
	id = params.id;
	mUmed.getAllActivas(function (umeds){
		mFormulado.getFormuladoPorId(id, function (docs){
			res.render('formuladomodificar',{
				pagename: 'Modificar Formulado',
				produ: docs[0],
				umeds: umeds
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
	lote = params.lote;
	umed = params.umed;
	concentracion = params.concentracion;
	
	if (activo =="on")
		activo = 1
	else
		activo = 0
	mFormulado.verificacionCodigo(id, codigo, function (verificacion){
		if (verificacion[0]==null){
			mFormulado.updateFormulado(id, cdcliente, codigo, nombre, lote, umed, activo, concentracion, function(){
					res.redirect('formuladolista/'+ cdcliente);
				});
		}else{
			res.render('error', {
       			error: "Codigo de Formulado existente para este cliente. Intente con otro Codigo de Formulado."
      		});
		}
	});
}

function getDelFormulado(req, res){
	params = req.params;
	id = params.id;
	mVerificacion.getFormuladoFromProductos(id, function (FormuladoFromProductos){
		if(FormuladoFromProductos[0]){
			res.render('error', {
       			error: "No puede eliminar este Formulado, posee movimientos."
      		});
		}else{
			mFormulado.getFormuladoPorId(id, function (docs){
				cdcliente= docs[0].cdcliente;
				prod = docs[0];
				mBorro.add(req.session.user.usuario,"Formulados", "Borra Nombre Formulado: "+ prod.nombre + ", id: " + id ,function(){
					mFormulado.delFormulado(id, function(){
						res.redirect('/formuladolista/'+ cdcliente)
					});
				});
			});	
		}
	});
}

function getForms(req, res){
	params = req.params;
  	idcliente = params.id;
  	//console.log('--------------p----IDCLIENTE:'+idcliente)
  	mFormulado.getAllActivosPorCliente(idcliente, function (forms){
  		//console.log('------------p------PRODS:'+forms)
    	res.send(forms);
  	});  
}

function getAbLote(req, res){
	params = req.params;
	console.log(params)
	id = params.idform;
	//console.log('------------------IDPROD:'+idcliente)
	mFormulado.getAbLotePorIDForm(id, function (formulado){
		//console.log('---------p---------FORM:' + formulado[0])
		res.send(formulado);
	});
}
