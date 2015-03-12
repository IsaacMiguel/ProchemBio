//requiriendo modelo mensaje.js:
var mMpEnReactor = require('../models/mMpEnReactor');
var mMatep = require('../models/mMatep');
var mReacto = require('../models/mReacto');
var mUmed = require('../models/mUmed');
var mBorro = require('../models/mBorro');
var mVerificacion = require('../models/mVerificacion');

module.exports = {
	getMpEnReactor: getMpEnReactor,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	del: del
};

function getMpEnReactor(req, res){
	params = req.params;
	id = params.id;
	mMpEnReactor.getMpsEnReactor(id, function (mpsenreactores){
		mMatep.getMatepPorId(id, function (matepporid){
			res.render('mpenreactorlista', {
				pagename: "Cantidad Maxima en Reactores/Mezcladores de ",
				mpsenreactores: mpsenreactores,
				matep: matepporid[0]
			});			
		});		
	});
}

function getAlta(req, res){
	params = req.params;
	idmp = params.idmp;
	mMatep.getMatepPorId(idmp, function (matepporid){
		mReacto.getAllActivos(function (reactores){
			res.render('mpenreactoralta',{
				pagename: "Setear Maximo de Capacidad en Reactor/Mezclador",
				reactores: reactores,
				matep: matepporid[0]
			});
		});
	});
}

function postAlta(req, res){
	params = req.body;
	idmp = params.idmp;
	idreactor = params.reactor;
	maxima = params.maxima;
	mMpEnReactor.getMPENREACTORporIDMPyIDREACTOR(idmp, idreactor, function (MPENREACTORporIDMPyIDREACTOR){
		if (MPENREACTORporIDMPyIDREACTOR[0] == null) {
			mMpEnReactor.insert(idmp, idreactor, maxima, function(){
				res.redirect('mpenreactor/'+ idmp);
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
	mMpEnReactor.getMpEnReactorPorID(id, function (mpenreactorporid){
		res.render('mpenreactormodificar',{
			pagename: 'Modificar Capacidad Maxima de Reactor/Mezclador',
			mpenreactor: mpenreactorporid[0]
		});
	});
}

function postModificar(req, res){
	params = req.body;
	reactor = params.reactor;
	maximo = params.maxima;
	mReacto.getReactorPorNombre(reactor, function (reactorpornombre){
		//console.log(reactorpornombre);
		idreactor=reactorpornombre[0].id;
		mMpEnReactor.getMPENREACTORporIDREACTOR(idreactor, function (MPENREACTORporIDREACTOR){
			mpenreactor= MPENREACTORporIDREACTOR[0];
			mMpEnReactor.update(mpenreactor.id, mpenreactor.idmp, idreactor, maximo, function(){
				res.redirect('mpenreactor/'+ mpenreactor.idmp);
			});
		});	
	});
}

function del(req, res){
	params = req.params;
	id = params.id;
	mMpEnReactor.getMpPorIdMpEnReactor(id, function (idmp){
		//mas adelante hacer la verificacion con el modelo mVerificacion
		mBorro.add(req.session.user.usuario, "MpEnReactor", "Borro id del mpenreactor: "+ id, function(){
			mMpEnReactor.del(id, function(){
				res.redirect('mpenreactor/'+ idmp[0].idmp)
			});
		});
	});	
}