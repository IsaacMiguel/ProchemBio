//requiriendo modelo mensaje.js:
var mProd = require('../models/mProd');
var mClientes = require('../models/mClientes');
var mUmed = require('../models/mUmed');
var mBorro = require('../models/mBorro');
var mForm = require('../models/mFormulados');
var mVerificacion = require('../models/mVerificacion');
var mFormulados = require('../models/mFormulados');

module.exports = {
	getAllProdPorCliente: getAllProdPorCliente,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDelProd: getDelProd,
	getProds: getProds,
	getAbLote:getAbLote
};

function getAllProdPorCliente(req, res) {
	params = req.params;
	cdcliente = params.cdcliente
	mProd.getAllProdPorCliente(cdcliente, function (docs){
		mClientes.getNombreDeClientePorId(cdcliente, function (nombredecliente){
			mForm.getAll(function (formulados){
				res.render('prodlista',{
					pagename: 'Archivo de Productos',
					prods: docs,
					cdcliente2: cdcliente,
					nombredecliente: nombredecliente[0],
					formulados: formulados
				});
			});
		});
	});
}

function getAlta(req, res){
	params = req.params;
	cdcliente = params.cdcliente;
	mUmed.getAllActivas(function (unidadesdemedida){
		mFormulados.getAllFormuladoPorCliente(cdcliente, function (formuladosPorCliente){
			res.render('prodalta', {
				pagename: 'Alta de Producto',
				cdcliente: cdcliente,
				umeds: unidadesdemedida,
				formulados: formuladosPorCliente
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
	lote = params.lote;
	idformulado = params.idformulado;
	cantidad = params.cantidad;

	mProd.getProdPorCodigoParaCadaCliente(codigo, cdcliente, function (docs){
    	if(docs[0]==null){
      		//si no hay coincidencias
      		mProd.getProdPorNombreParaCadaCliente(nombre, cdcliente, function (docs2){
      			if (docs2[0]==null){
      				mProd.verificacionCodigo(cdcliente, codigo, function (verificacion){
						if (verificacion[0]==null){
							mProd.insertProd(codigo, cdcliente, lote, umed, nombre, idformulado, cantidad, function(){
								res.redirect('prodlista/'+ cdcliente);
							});
						}else{
							res.render('error', {
				       			error: "Codigo de Producto existente para este cliente. Intente con otro Codigo de Producto."
				      		});
						}
					});
      			}else{
      				res.render('error', {
      					error: "Nombre de Producto existente para este cliente. Intente con otro Nombre de Producto."
      				});
      			}
      		});      		
   		}else{
      	//si hay coincidencias ->error
      	res.render('error', {
       		error: "Codigo de Producto existente para este cliente. Intente con otro Codigo de Producto."
      	});
    }
  });
}

function getModificar(req, res){
	params = req.params;
	id = params.id;
	mUmed.getAllActivas(function (umeds){
		mProd.getProdPorId(id, function (docs){
			//console.log(docs[0])
			mProd.getcdClientePorIdProducto(id, function (producto){
				mForm.getFormsPorIdCliente(producto[0].cdcliente, function (formulados){
					res.render('prodmodificar',{
						pagename: 'Modificar Producto',
						produ: docs[0],
						umeds: umeds,
						formulados: formulados
					});
				});
			});			
		});
	});	
}

function postModificar(req, res){
	params = req.body;
	id = params.id;
	console.log(params)
	codigo = params.codigo;
	cdcliente = params.cdcliente;
	nombre = params.nombre;
	activo = params.activo;
	lote = params.lote;
	umed = params.umed;
	idformulado = params.idformulado;
	cantidad = params.cantidad;

	if (activo =="on")
		activo = 1
	else
		activo = 0
	mProd.verificacionCodigo(id, codigo, function (verificacion){
		if (verificacion[0]==null){
			mProd.updateProd(id, cdcliente, codigo, nombre, lote, umed, activo, idformulado, cantidad, function(){
					res.redirect('prodlista/'+ cdcliente);
				});
		}else{
			res.render('error', {
       			error: "Codigo de Producto existente para este cliente. Intente con otro Codigo de Producto."
      		});
		}
	});
	
}

function getDelProd(req, res){
	params = req.params;
	id = params.id;

	mVerificacion.getProdFromProgramacion(id, function (prodFromProgramacion){
		if(prodFromProgramacion[0]){
			res.render('error', {
       			error: "No puede eliminar este Producto, posee movimientos."
      		});
		}else{
			mVerificacion.getProdFromConsumibles(id, function (prodFromConsumibles){
				if(prodFromConsumibles[0]){
					res.render('error', {
		       			error: "No puede eliminar este Producto, posee movimientos."
		      		});
				}else{
					mProd.getProdPorId(id, function(docs){
						cdcliente= docs[0].cdcliente;
						prod = docs[0];
						mBorro.add(req.session.user.usuario,"Productos", "Borra Nombre Producto: "+ prod.nombre + ", id: " + id ,function(){
							mProd.delProd(id, function(){
								res.redirect('/prodlista/'+ cdcliente)
							});
						});
					});
				}
			});
		}
	});
}

function getProds(req, res){
	params = req.params;
  	idcliente = params.id;
  	console.log('------------------IDCLIENTE:'+idcliente)
  	mProd.getAllActivosPorCliente(idcliente, function(prods){
  		console.log('------------------PRODS:'+prods)
    	res.send(prods);
  	});  
}

function getAbLote(req, res){
	params = req.params;
	id = params.idprod;
	console.log('------------------IDPROD:'+idcliente)
	mProd.getAbLotePorIDProd(id, function(producto){
		console.log('------------------PROD:' + producto[0])
		res.send(producto);
	});
}
