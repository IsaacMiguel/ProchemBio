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
var mColores = require('../models/mColores');

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
  	mAyuda.getAyudaTexto(req.session.nromenu, function (ayuda){
	  	mMatep.getAllActivas(function (mateps){
			mClientes.getAllActivos(function (clientes){
				mEnvases.getAllActivos(function (envases){
					mUbica.getAllActivos(function (ubicaciones){
						mRemitos.getAll(function (remitos){
							mTipos.getAll(function (tipos){
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
	mClientes.getAllActivos(function (clientes){
		mEnvases.getAllActivos(function (envases){
			mUbica.getAllActivos(function (ubicaciones){
				mTipos.getAll(function (tipos){
					mColores.getAll(function (colores){
						res.render('remitosalta', {
							pagename: 'Alta de Remitos de Materias Primas',
							clientes: clientes,
							envases: envases,
							ubicaciones: ubicaciones,
							tipos: tipos,
							colores: colores
						});
					});
				});					
			});				
		});				
	});
}

function postAlta(req, res){
	params= req.body;
	//console.log(params)
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
	cinta1 = params.cinta1;
	cinta2 = params.cinta2;
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

	if (cinta1 == null || cinta2 == null || cinta1 == 0 || cinta2 == 0 || cinta1 == undefined){
		cinta1 = 19;
		cinta2 = 19;
	}

	mMovi.add(fechahoy,req.session.user.unica, function(){
		mMovi.getUltimo(function(docs){
			nmovi = docs[0].id;
			mRemitos.insert(tipo, fechar, fecham, nroremito, cliente, matep, lote, envase, cantidad, neto, conceori, concepla, ubicacion, cinta1, cinta2, nmovi, observaciones, function(){
				res.redirect('remitoslista');
			});
		});
	});
}

function getModificar(req, res){
	params = req.params;
	id = params.id;
	mClientes.getAllActivos(function (clientes){
		mEnvases.getAllActivos(function (envases){
			mUbica.getAllActivos(function (ubicaciones){
				mRemitos.getRemitoPorId(id, function (remito){
					console.log(remito[0])
					mTipos.getAll(function (tipos){
						mColores.getAll(function (colores){
							mMatep.getMatepPorId(remito[0].matepid, function (matep){
								console.log(matep[0])
								res.render('remitosmodificar', {
									pagename: 'Modificar Remito',
									matep: matep[0],
									clientes: clientes,
									envases: envases,
									ubicaciones: ubicaciones,
									remito:remito[0],
									tipos: tipos,
									colores: colores	
								});
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
	//console.log(params)
	tipo = params.tipo;
	fechar = params.fechar;
	fecham = params.fecham;
	nroremito = params.nremito;
	cliente = params.idcliente;
	matep = params.idmatep;
	lote = params.lote;
	envase = params.envase;
	cantidad = params.cantidad;
	neto = params.neto;
	conceori = params.conceori;
	concepla = params.concepla;
	ubicacion = params.ubicacion;

	usacinta = params.usacinta;
	if (usacinta == 1){
		cinta1 = params.cinta1;
		cinta2 = params.cinta2;	
	}else{
		cinta1 = 19;
		cinta2 = 19;
	}
	observaciones = params.observaciones;
	fechar = changeDate(fechar);
	fecham = changeDate(fecham);
	console.log(cinta1)
	console.log(cinta2)	


	mRemitos.update(tipo, fechar, fecham, nroremito, cliente, matep, lote, envase, cantidad, neto, conceori, concepla, ubicacion, cinta1, cinta2, observaciones, function(){
		res.redirect('/remitoslista');
	});
}

function getDel(req, res){
	params = req.params;
	id = params.id;
	mRemitos.getRemitoPorId(id, function (remito){
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
	mRemitos.getRemitosEntreFechas(finicio, ffin, function (remitos){
		res.send(remitos);
	});
}