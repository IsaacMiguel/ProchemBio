//requiriendo modelo mensaje.js:
var mReceta = require('../models/mReceta');
var mFormulado = require('../models/mFormulados');
var mMatep = require('../models/mMatep');
var mProd = require('../models/mProd');
var mBorro = require('../models/mBorro');
var mConsumibles = require('../models/mConsumibles');
var mCliente = require('../models/mClientes');

module.exports = {
	getAll: getAll,
	getAlta: getAlta,
	postAlta: postAlta,
	getDel: getDel
};

function getAll(req, res) {
	params = req.params;
	id = params.idprod;//id de producto
	mProd.getAll(function (productos){
		mProd.getProdPorId(id, function (produc){
			mProd.getcdClientePorIdProducto(id, function (prod){
				mCliente.getClientePorID(prod[0].cdcliente, function (cliente){
					mMatep.getAllActivasPorCliente(prod[0].cdcliente, function (mateps){
						mConsumibles.getConsuPorIdProd(id, function (consu){
							//console.log(consu)
							res.render('consumibleslista',{
								pagename: 'Consumibles de ',
								productos: productos,
								mateps: mateps,
								produc: produc[0],
								cliente: cliente[0],
								consumibles: consu
							});
						});
					});	
				});
			});
		});
	});	
}

function getAlta(req, res) {
	params = req.params;
	id = params.idprod;//id del producto
	//console.log(id)
	mProd.getProdPorId(id, function (producto){
		//console.log(producto[0].idFormulado)
		mFormulado.getcdClientePorIdFormulado(producto[0].idFormulado, function (cliente){
			//console.log(cliente)
			if (producto[0].idFormulado != 0){
				mMatep.getAllActivasPorCliente(cliente[0].cdcliente, function (mateps){
					res.render('consumiblesalta',{
						pagename: 'Alta de Consumibles',
						mateps: mateps,
						producto: producto[0]
					});
				});
			}else{
				res.render('error', {
					error: "El producto debe tener un Formulado asignado para poder agregar Consumibles."
				});
			}
		});
	});		
}

function postAlta(req, res) {
	params = req.body;
	idproducto = params.idproducto;
	matep = params.matep;
	cantidad = params.cantidad;
	mConsumibles.insert(idproducto, matep, cantidad, function(){
		res.redirect('/consumibleslista/'+ idproducto);
	});
	//res.render('error', {
	//	error: "El Porcentaje no puede ser mayor a 100."
	//};
}

function getDel(req, res){
	params = req.params;
	id = params.id;//id del consumible
	mConsumibles.getConsumiblePorId(id, function(consu){
		consu = consu[0];
	    mBorro.add(req.session.user.usuario,"Consumibles", "Borra Nombre Consumible: "+ consu.nombre + ", id: " + id ,function(){
			mConsumibles.del(id, function(){
				res.redirect('/consumibleslista/'+ consu.producid);
			});
	    });
	});
}
