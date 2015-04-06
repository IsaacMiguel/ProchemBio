//requiriendo modelo mensaje.js:
var mFormEnReactor = require('../models/mFormEnReactor');
var mForm = require('../models/mFormulados');
var mReacto = require('../models/mReacto');
var mUmed = require('../models/mUmed');
var mBorro = require('../models/mBorro');
var mVerificacion = require('../models/mVerificacion');

module.exports = {
	getFormEnReactor: getFormEnReactor,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	del: del
};

function getFormEnReactor(req, res){
	params = req.params;
	id = params.id;
	mFormEnReactor.getFormsEnReactor(id, function (formsenreactores){
		mForm.getFormuladoPorId(id, function (formporid){
			res.render('formenreactorlista', {
				pagename: "Cantidad Maxima en Reactores/Mezcladores de ",
				formsenreactores: formsenreactores,
				form: formporid[0]
			});			
		});		
	});
}

function getAlta(req, res){
	params = req.params;
	idform = params.idform;
	mForm.getFormuladoPorId(idform, function (formporid){
		mReacto.getAllActivos(function (reactores){
			res.render('formenreactoralta',{
				pagename: "Setear Maximo de Capacidad en Reactor/Mezclador",
				reactores: reactores,
				form: formporid[0]
			});
		});
	});
}

function postAlta(req, res){
	params = req.body;
	idform = params.idform;
	idreactor = params.reactor;
	maxima = params.maxima;
	mFormEnReactor.getFORMENREACTORporIDREACTOyIDFORM(idreactor, idform, function (FORMENREACTORporIDFORMyIDREACTOR){
		if (FORMENREACTORporIDFORMyIDREACTOR[0] == null) {
			mFormEnReactor.insert(idform, idreactor, maxima, function(){
				res.redirect('formenreactor/'+ idform);
			});
		}else{
			res.render('error', {
  				error: "El Reactor/Mezclador seleccionado ya tiene un capacidad maxima seteada."
  			});
		}
	});
}

function getModificar(req, res){
	params = req.params;
	id = params.id;
	mFormEnReactor.getFormEnReactorPorID(id, function (formenreactorporid){
		console.log(formenreactorporid)
		res.render('formenreactormodificar',{
			pagename: 'Modificar Capacidad Maxima de Reactor/Mezclador',
			formenreactor: formenreactorporid[0]
		});
	});
}

function postModificar(req, res){
	params = req.body;
	reactor = params.reactor;
	maximo = params.maxima;
	formenreactorid = params.formenreactorid;
	mReacto.getReactorPorNombre(reactor, function (reactorpornombre){
		//console.log(reactorpornombre);
		idreactor=reactorpornombre[0].id;
		mFormEnReactor.getFormEnReactorPorID(formenreactorid, function (FORMENREACTORporID){
			formenreactor= FORMENREACTORporID[0];
			mFormEnReactor.update(formenreactorid, formenreactor.id_form_fk, idreactor, maximo, function(){
				res.redirect('formenreactor/'+ formenreactor.id_form_fk);
			});
		});	
	});
}

function del(req, res){
	params = req.params;
	id = params.id;
	mFormEnReactor.getFormPorIdFormEnReactor(id, function (idform){
		//mas adelante hacer la verificacion con el modelo mVerificacion
		mBorro.add(req.session.user.usuario, "FormEnReactor", "Borro id del formenreactor: "+ id, function(){
			mFormEnReactor.del(id, function(){
				res.redirect('formenreactor/'+ idform[0].id_form_fk)
			});
		});
	});	
}