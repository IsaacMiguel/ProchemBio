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
var mFormEnReactor = require('../models/mFormEnReactor');
var mRemitos = require('../models/mRemitos');
var mMatep = require('../models/mMatep');
var mReceta = require('../models/mReceta');
var mEnvase = require('../models/mEnvases');
var mUmed = require('../models/mUmed');

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
  	mAyuda.getAyudaTexto(req.session.nromenu, function (ayuda){
	  	mProgramacion.getAll(function (progs){
			res.render('prog1lista', {
				pagename: 'Lista de Programaciones',
				progs: progs,
				ayuda: ayuda[0]
			});
		});
  	});
}

function getAlta(req, res){
  	mClientes.getAllActivos(function (clientes){
    	mEmple.getAllActivos(function (empleados){
      		mReacto.getAllActivos(function (reactores){
        		mTanques.getAllActivos(function (tanques){
        			mEnvase.getAllActivos(function (envases){
        				res.render('prog1alta',{
				            pagename:"Alta de Programacion Parte 1",
				            tanques: tanques,
				            equipos: reactores,
				            empleados: empleados,
				            clientes: clientes,
				            envases: envases
	          			});
        			});
        		});
      		});
    	});    
  	});
}

function postAlta(req, res){
	params = req.body;
	//console.log(req.body)
	fechap = params.fecha;
	turno = params.turno;
	idcliente = params.cliente;
	formulado = params.cmbForm;
	formulador = params.formulador;
	equipo = params.equipo;
	tanquedestino = params.tanquedestino;
	idremito = params.cmbRemito;
	idenvase = params.envase;

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

	mFormEnReactor.getFORMENREACTORporIDREACTOyIDFORM(equipo, formulado, function (formenreactor){
		if (formenreactor[0]==null){
				res.render('error', {
			    pagename: 'Error',
			    error: 'El Formulado debe tener un máximo seteado en el reactor seleccionado. Hágalo y vuelva a intentar.'
			});
		}else{
			maximo = formenreactor[0].maximo;
			mRemitos.getRemitoPorId(idremito, function (remito){
				concepla = remito[0].concepla;
				mFormulados.getFormuladoPorId(formulado, function (form){
					concepf = form[0].concentracion;
					mProgramacion.insert(fechap, fechar, turno, idcliente, formulado, formulador, equipo, tanquedestino, lote, idenvase, maximo, concepla, concepf, idremito, function(){
					res.redirect('prog1lista');
				});
				});
			});
		}
	});
}


function getLista(req, res){
	req.session.nromenu = 14;
  	mAyuda.getAyudaTexto(req.session.nromenu, function (ayuda){
		res.render('prog2lista', {
		    pagename: 'Programacion Parte 2',
		    ayuda: ayuda[0]
		});
	});
}

function getAlta2(req, res){
	req.session.nromenu = 14;
	params = req.params;
	id = params.idprog;
  	mAyuda.getAyudaTexto(req.session.nromenu, function (ayuda){
  		mProgramacion.getProgPorId(id, function (prog){
  			if (prog[0].resultado != 0){
  				//id //id de prog1
  				//prog[0].id_matep.fk //id de la matep de prog1
  				mProgramacion.getProg2Poridp1JoinMatepPA(id, function (p2){
  					if (p2[0] != null){
  						console.log("p2: "+p2[0].peso_obj)
  						mFormEnReactor.getFORMENREACTORporIDREACTOyIDFORM(prog[0].reactoid, prog[0].formuladoid, function (formenreactor){
	  						console.log(formenreactor)
			  				mEnvase.getEnvasePorId(prog[0].id_envase_fk, function (envase){
			  					if (envase[0] != null){
									mUmed.getUmedPorId(envase[0].umed, function (umed){
				  						if (umed[0] != null){
											res.render('prog1alta2',{
												pagename:"Programacion Parte 2 - Producir",
												ayuda: ayuda[0],
												prog: prog[0],
												formenreactor: formenreactor[0],
												envase: envase[0],
												umed: umed[0],
												p2: p2[0]
											});
				  						}else{
				  							res.render("error",{
				  								error: "umed"
				  							});
				  						}
			  						});
			  					}else{
			  						res.render("error", {
			  							error: "Falta agregar el Envase a esta Programación. Elimine la Programacion Vieja y cree una Nueva Programacion en el menú Programacion 1."
			  						});
			  					}
			  				});
			  			});
  					}else{
  						res.render("error", {
  							error: "p2"
  						});
  					}  					
  				});
  			}else{
  				mFormEnReactor.getFORMENREACTORporIDREACTOyIDFORM(prog[0].reactoid, prog[0].formuladoid, function (formenreactor){
	  				mEnvase.getEnvasePorId(prog[0].id_envase_fk, function (envase){
	  					if (envase[0] != null){
							mUmed.getUmedPorId(envase[0].umed, function (umed){
		  						if (umed[0] != null){
									res.render('prog1alta2',{
										pagename:"Programacion Parte 2 - Producir",
										ayuda: ayuda[0],
										prog: prog[0],
										formenreactor: formenreactor[0],
										envase: envase[0],
										umed: umed[0]
									});
		  						}else{
		  							res.render("error",{
		  								error: "umed"
		  							});
		  						}
	  						});
	  					}else{
	  						res.render("error", {
	  							error: "Falta agregar el Envase a esta Programación. Elimine la Programacion Vieja y cree una Nueva Programacion en el menú Programacion 1."
	  						});
	  					}
	  				});
	  			});
  			}
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
		//console.log(prog)
		if (cantidad <= prog[0].maximo){
			//mProgramacion.updateMaximo(id, cantidad, function(){
				mProgramacion.postResultado(id, resultado, function (){
					//busco la receta de ese formulado, me devuelve un objeto "receta" 
					idformulado = prog[0].formuladoid;
					mReceta.getRecetaPorIdFormuladoLeftJoinMatep(idformulado, function (receta){
						//para cada "matep" de "receta", calcular "porce" x "resultado"
						mRemitos.getRemitoPorId(prog[0].id_remito_fk, function (remito){
							mProgramacion.limpiarp2(id, function(){
								receta.forEach(function (matep){
									peso_obj = (matep.porce*resultado)/100;
									peso_obj = Math.round(peso_obj);
									if (matep.pactivo == 1){
										lote = remito[0].lote;
										mProgramacion.postp2(id, matep.matepid, cantidad, lote, function(){
											//se agregaron los datos a program2
										});	
									}else{
										lote= "";
										mProgramacion.postp2(id, matep.matepid, peso_obj, lote, function(){
											//se agregaron los datos a program2
										});	
									}
								});
							});					
							res.redirect('prog2lista');
						})
						
					});								
				});
			//});
		}else{
			res.render('error',{
				error: "La cantidad de Principio Activo no puede superar el máximo seteado para ese Reactor/Mezclador."
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