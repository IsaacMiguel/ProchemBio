//requiriendo modelo mensaje.js:
var mFormula = require('../models/mFormula');
var mFormulas = require('../models/mFormulados');
var mMatep = require('../models/mMatep');
var mClientes = require('../models/mClientes');
var mBorro = require('../models/mBorro');

module.exports = {
	getFormulaPorProducto: getFormulaPorProducto,
	getAlta: getAlta,
	postAlta: postAlta,
	getDel: getDel
};

function getFormulaPorProducto(req, res) {
	params = req.params;
	id = params.id;
	mFormulas.getFormulaPorIdProducto(id, function(Formulas){
		mFormulas.getFormuladoPorId(id, function(formulado){
			//console.log(producto)
			mFormulas.getcdClientePorIdProducto(id, function(cdcliente){
				//console.log(cdcliente)
				mClientes.getClientePorID(cdcliente[0].cdcliente,function(cliente){
					mMatep.getAllActivasPorCliente(cdcliente[0].cdcliente, function(mateps){
						res.render('Formulalista',{
							pagename: 'Formula de ',
							Formulas: Formulas,
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
	id = params.id;//id del producto
	mFormulas.getFormuladoPorId(id, function(producto){
		mFormulas.getcdClientePorIdFormulado(id, function(cliente){
			mMatep.getAllActivasPorCliente(cliente[0].cdcliente, function(mateps){
				res.render('Formulaalta',{
					pagename: 'Alta de Formula',
					mateps: mateps,
					producto: producto[0]
				});
			});
		});
	});	
}

function postAlta(req, res) {
	params = req.body;
	idproducto = params.idproducto;
	matep = params.matep;
	porcentaje = params.porcentaje;
	formula = params.formula;
	soloporce = params.soloporce;
	if (soloporce == "on")
		soloporce = 1;
	else
		soloporce = 0;
	usalote = params.usalote;
	if (usalote == "on")
		usalote=1;
	else
		usalote=0;

	mFormula.insert(idproducto, matep, porcentaje, formula, soloporce, usalote, function(){
		res.redirect('/Formulalista/'+ idproducto);
	});
}

function getDel(req, res){
	params = req.params;
	id = params.id;
	mFormulas.getFormulaPorId(id, function(Formula){
		Formula = Formula[0];
		mFormulas.getFormuladoIdPorIdFormula(id, function(formulado){
		    mBorro.add(req.session.user.usuario,"Formulas", "Borra Nombre Formula: "+ Formula.nombre + ", id: " + id ,function(){
				mFormula.del(id, function(){
					res.redirect('/Formulalista/'+ formulado[0].producid);
				});
		    });
		});
	});
}
