//requiriendo modelo mensaje.js:
var mProgramacion = require('../models/mProgramacion');
var mBorro = require('../models/mBorro');
var mVerificacion = require('../models/mVerificacion');
var mClientes = require('../models/mClientes');
var mFormulados = require('../models/mFormulados');
var mTanques = require('../models/mTanques');
var mEmple = require('../models/mEmple');
var mReacto = require('../models/mReacto');
var mAyuda = require('../models/mAyuda');
var mMpEnReactor = require('../models/mMpEnReactor');
var mRemitos = require('../models/mRemitos');
var mMatep = require('../models/mMatep');
var mReceta = require('../models/mReceta');

module.exports = {
	getAll: getAll,
  	getAlta: getAlta,
  	postAlta: postAlta,
  	getCodigo: getCodigo,
  	getAlta2: getAlta2,
  	postAlta2: postAlta2,
  	getDel: getDel,
  	getRemitos: getRemitos,
  	getPA: getPA,
  	getLista: getLista,
  	getProgramaciones: getProgramaciones,
  	getDelProgram: getDelProgram
}

function changeDate(date){
	// input: dd/mm/yyyy
	fechaus = date.substring(6,10) + "/" + date.substring(3,5) + "/" + date.substring(0,2);
	return fechaus;
	// output: yyyy/mm/dd
}

function getAll(req, res) {
	req.session.nromenu = 11;
  	mAyuda.getAyudaTexto(req.session.nromenu, function(ayuda){
	  	mProgramacion.getAll(function(progs){
			res.render('prog1lista', {
				pagename: 'Programacion',
				progs: progs,
				ayuda: ayuda[0]
			});
		});
  	});
}

function getAlta(req, res){
  	mClientes.getAllActivos(function(clientes){
    	mEmple.getAllActivos(function(empleados){
      		mReacto.getAllActivos(function(reactores){
        		mTanques.getAllActivos(function(tanques){
          			res.render('prog1alta',{
			            pagename:"Alta de Programacion Parte 1",
			            tanques: tanques,
			            equipos: reactores,
			            empleados: empleados,
			            clientes: clientes
          			})
        		});
      		});
    	});    
  	});
}

function postAlta(req, res){
	params = req.body;
	console.log(req.body)
	fechap = params.fecha;
	turno = params.turno;
	idcliente = params.cliente;
	formulado = params.cmbForm;
	formulador = params.formulador;
	equipo = params.equipo;
	tanquedestino = params.tanquedestino;
	idremito = params.cmbRemito;
	var currentTime = new Date();
	if (currentTime.getDate()<10){
		day = "0"+currentTime.getDate();
	}
	month = currentTime.getMonth() +1
	if (month<10){
		month = "0"+month;
	}
	lote = params.txtAbLote + params.anio + params.codigo
	fechar =currentTime.getFullYear() + '/' + month + '/' + day  ;
	fechap = changeDate(fechap);

	mProgramacion.getPA(formulado, function (PA){
  		mMpEnReactor.getMPENREACTORporIDREACTOyIDMP(equipo, PA[0].matepid, function (mpenreactor){
  			maximo = mpenreactor[0].maximo;
  			mRemitos.getRemitoPorId(idremito, function (remito){
  				concepla = remito[0].concepla;
  				mMatep.getMatepPorId(remito[0].matepid, function (matep){
  					concepf = matep[0].concentracion;
  					mProgramacion.insert(fechap, fechar, turno, idcliente, formulado, formulador, equipo, tanquedestino, lote, maximo, concepla, concepf, function(){
						res.redirect('prog1lista');
					});
  				});
  			});
  			
  		});
  	});
}


function getLista(req, res){
  res.render('prog2lista', {
    pagename: 'Programacion Parte 2'
  });
}

function getAlta2(req, res){
	req.session.nromenu = 14;
	params = req.params;
	id = params.idprog;
  	mAyuda.getAyudaTexto(req.session.nromenu, function (ayuda){
  		mProgramacion.getProgPorId(id, function (prog){
  			res.render('prog1alta2',{
				pagename:"Programacion Parte 2",
				ayuda: ayuda[0],
				prog: prog[0]
			});	
  		});			
	});
}

function postAlta2(req, res){
	params = req.body;
	cantidad = params.cant;
	titulo = params.titulo;
	porce = params.porce;
	resultado = params.volfinal;
	id = params.id;

	mProgramacion.getProgPorId(id, function (prog){
		console.log(prog)
		if(prog[0].resultado!=0){
			res.render('error',{
				error: "Esta Programacion ya tiene un Resultado guardado."
			});
		}else{
			mProgramacion.postResultado(id, resultado, function (){
				//busco la receta de ese formulado, me devuelve un objeto "receta" 
				idformulado = prog[0].formuladoid;
				mReceta.getRecetaPorIdFormulado(idformulado, function (receta){
					//para cada "matep" de "receta", calcular "porce" x "resultado"
					mProgramacion.limpiarp2(id, function(){
						receta.forEach(function (matep){
							peso_obj = (matep.porce*resultado)/100;
							console.log(matep.porce+'*'+resultado+'='+peso_obj);
							mProgramacion.postp2(id, matep.matepid, peso_obj, function(){
								//se agregaron los datos a program2
							});
						});
					});					
					res.redirect('prog2lista');
				});								
			});
		}
	});	
}

function getCodigo(req, res){
	params = req.params;
	lote = params.lote;
	anio = params.anio;
	clienteid = params.clienteid;
	prodid = params.prodid;
	mProgramacion.getCodigo(lote, anio, clienteid, prodid, function (data){
		if (data == null){
			res.send(data);
		}else{
			res.send(data[0]);
		}
	});
}

function getDel(req, res){
	params = req.params;
	id = params.id;
	mProgramacion.del(id, function(){
		res.redirect('prog1lista');
	})
}

function getRemitos(req, res){
	params = req.params;
	idcliente = params.idcliente;
	idmatep = params.idmatep;
	mProgramacion.getRemitos(idcliente, idmatep, function (data){
		//console.log(data)
		res.send(data);
	})
}

function getPA(req, res){
	params = req.params;
	idform = params.idform;
	mProgramacion.getPA(idform, function (data){
		//console.log(data)
		res.send(data)
	})
}

function getProgramaciones(req, res){
  params = req.params;
  fecha = params.fecha;
  fecha = changeDate(fecha);
  mProgramacion.getProgramaciones(fecha, function (data){
    res.send(data);
  });
}

function getDelProgram(req, res){
  params = req.params;
  id = params.id;
  mProgramacion.del(id, function (){
    res.redirect('prog2lista');
  });
}