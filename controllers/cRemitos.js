//requiriendo modelo mensaje.js:
var mRemitos = require('../models/mRemitos');
var mMatep = require('../models/mMatep');
var mClientes = require('../models/mClientes');
var mEnvases = require('../models/mEnvases');
var mUbica = require('../models/mUbica');
var mTipos = require('../models/mTipos');
var mBorro = require('../models/mBorro');
var mMovi = require('../models/mMovi');
var mAyuda = require('../models/mAyuda');

module.exports = {
	getAll: getAll,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel,
	getRemitos: getRemitos
};

function changeDate(date){
	// input: dd/mm/yyyy
	//date = new Date(date);
	//console.log(date);
	fechaus = date.substring(6,10) + "/" + date.substring(3,5) + "/" + date.substring(0,2);
	return fechaus;
	// output: yyyy/mm/dd
}

function getAll(req, res) {
	req.session.nromenu = 10;
  	mAyuda.getAyudaTexto(req.session.nromenu, function(ayuda){
	  	mMatep.getAllActivas(function(mateps){
			mClientes.getAllActivos(function(clientes){
				mEnvases.getAllActivos(function(envases){
					mUbica.getAllActivos(function(ubicaciones){
						mRemitos.getAll(function(remitos){
							mTipos.getAll(function(tipos){
								res.render('remitoslista', {
									pagename: 'Archivo de Remitos',
									remitos: remitos,
									ubicaciones: ubicaciones,
									envases: envases,
									clientes: clientes,
									mateps: mateps,
									tipos: tipos,
									ayuda: ayuda[0]
								});
							});
						});
					});
				});
			});
		});
  	});
}

function getAlta(req, res){	
	mClientes.getAllActivos(function(clientes){
		mEnvases.getAllActivos(function(envases){
			mUbica.getAllActivos(function(ubicaciones){
				mTipos.getAll(function(tipos){
					//console.log(tipos)
					res.render('remitosalta', {
						pagename: 'Alta de Remitos de Materias Primas',
						//mateps: mateps,
						clientes: clientes,
						envases: envases,
						ubicaciones: ubicaciones,
						tipos: tipos
					});
				});					
			});				
		});				
	});
}

function postAlta(req, res){
	params= req.body;
	console.log(params)
	tipo = params.tipo;
	fechar = params.fechar;
	fecham = params.fecham;
	nroremito = params.nroremito;
	cliente = params.cliente;
	matep = params.cmbMatep;
	lote = params.lote;
	envase = params.envase;
	cantidad = params.cantidad;
	neto = params.neto;
	conceori = 0;
	concepla = 0;
	ubicacion = params.ubicacion;
	observaciones= params.observaciones;
	//agregar movimiento
	date = new Date();
	day = date.getDate();
	if (day<10)
		day = "0"+day;
	month = date.getMonth()+1
	if (month<10)
		month="0"+month;
	date = date.getFullYear() + "/" + month + "/" + day;
	fechahoy =  date
	fechar = changeDate(fechar);
	fecham = changeDate(fecham);

	mMovi.add(fechahoy,req.session.user.unica, function(){
		mMovi.getUltimo(function(docs){
			nmovi = docs[0].id;
			mRemitos.insert(tipo, fechar, fecham, nroremito, cliente, matep, lote, envase, cantidad, neto, conceori, concepla, ubicacion, nmovi, observaciones, function(){
				res.redirect('remitoslista');
			});
		});
	});
}

function getModificar(req, res){
	params = req.params;
	id = params.id;
	mMatep.getAllActivas(function(mateps){
		mClientes.getAllActivos(function(clientes){
			mEnvases.getAllActivos(function(envases){
				mUbica.getAllActivos(function(ubicaciones){
					mRemitos.getRemitoPorId(id, function(remito){
						mTipos.getAll(function(tipos){
							res.render('remitosmodificar', {
								pagename: 'Modificar Remito',
								mateps: mateps,
								clientes: clientes,
								envases: envases,
								ubicaciones: ubicaciones,
								remito:remito[0],
								tipos: tipos	
							});
						});						
					});
				});
			});
		});
	});	
}

function postModificar(req, res){
	params= req.body;
	console.log(params)
	tipo = params.tipo;
	fechar = params.fechar;
	fecham = params.fecham;
	nroremito = params.nremito;
	cliente = params.cliente;
	matep = params.matep;
	lote = params.lote;
	envase = params.envase;
	cantidad = params.cantidad;
	neto = params.neto;
	conceori = params.conceori;
	concepla = params.concepla;
	ubicacion = params.ubicacion;
	observaciones = params.observaciones;
	fechar = changeDate(fechar);
	fecham = changeDate(fecham);
	
	mRemitos.update(tipo, fechar, fecham, nroremito, cliente, matep, lote, envase, cantidad, neto, conceori, concepla, ubicacion, observaciones, function(){
		res.redirect('/remitoslista');
	});
}

function getDel(req, res){
	params = req.params;
	id = params.id;
	mRemitos.getRemitoPorId(id, function(remito){
		remito = remito[0];
		mBorro.add(req.session.user.usuario,"Remitos", "Borra id Remito: " + id ,function(){
	      	mRemitos.del(id, function(){
				res.redirect('/remitoslista');
			});
	    });
	});
}

function getRemitos(req, res){
	params = req.params;
	finicio = params.finicio;
	ffin = params.ffin;
	//dd/mm/yyyy
	//console.log(ffin)
	finicio = changeDate(finicio);
	ffin = changeDate(ffin);
	//console.log(ffin)
	mRemitos.getRemitosEntreFechas(finicio, ffin, function(remitos){
		res.send(remitos);
	});
}