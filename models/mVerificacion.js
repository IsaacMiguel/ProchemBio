var conn = require('../config/db').conn;

module.exports = {
	getClienteFromMatep: getClienteFromMatep,
	getClienteFromProduc: getClienteFromProduc,
	getUsuarioFromMovi: getUsuarioFromMovi,
	getUbicaFromRemito: getUbicaFromRemito,
	getMatepFromRemito: getMatepFromRemito,
	getMatepFromReceta: getMatepFromReceta,
	getEnvaseFromRemito: getEnvaseFromRemito,	
	getUmedFromProduc: getUmedFromProduc,
	getUmedFromMatep: getUmedFromMatep,
	getUmedFromFormulados: getUmedFromFormulados,
	getUmedFromEnvases: getUmedFromEnvases,
	getUmedFromTanques: getUmedFromTanques,
	getClienteFromFormulado: getClienteFromFormulado,
	getClienteFromRemito: getClienteFromRemito,
	getClienteFromProgramacion: getClienteFromProgramacion,
	getProdFromProgramacion: getProdFromProgramacion,
	getProdFromConsumibles: getProdFromConsumibles,
	getMatepFromConsumibles: getMatepFromConsumibles,
	getFormuladoFromProductos: getFormuladoFromProductos
}

function getClienteFromMatep(idcliente, cb){
	conn("select * from matep where cdcliente ="+ idcliente, cb);
}

function getClienteFromProduc(idcliente, cb){
	conn("select * from produc where cdcliente ="+ idcliente, cb);
}

function getUsuarioFromMovi(idusuario, cb){
	conn("select * from movi where usuario="+ idusuario, cb);
}

function getUbicaFromRemito(idubica, cb){
	conn("select * from remitomp where ubicaid="+ idubica, cb);
}

function getMatepFromRemito(idmatep, cb){
	conn("SELECT * from remitomp where matepid="+idmatep, cb);
}

function getEnvaseFromRemito(idenvase, cb){
	conn("SELECT * from remitomp where envaseid="+idenvase, cb);
}

function getMatepFromReceta(idmatep, cb){
	conn("SELECT * FROM receta where matepid="+idmatep, cb);
}

function getUmedFromProduc(codigoumed, cb){
	conn("SELECT * FROM produc where umed='"+codigoumed+"'", cb);
}

function getUmedFromMatep(codigoumed, cb){
	conn("SELECT * from matep where umed='"+codigoumed+"'", cb);
}

function getUmedFromFormulados(codigoumed, cb){
	conn("Select * from formulados where umed='"+codigoumed+"'", cb);
}

function getUmedFromEnvases(idumed, cb){
	conn("SELECT * from envases where umed="+idumed, cb);
}

function getUmedFromTanques(codigoumed, cb){
	conn("SELECT * from tanques where umed = '"+codigoumed+"'", cb);
}

function getClienteFromFormulado(idcliente, cb){
	conn("SELECT * from Formulados where cdcliente="+idcliente, cb);
}

function getClienteFromRemito(idcliente, cb){
	conn("SELECT * from Remitomp where clienteid="+idcliente, cb);
}

function getClienteFromProgramacion(idcliente, cb){
	conn("SELECT * from Program1 where clienteid="+idcliente, cb);
}

function getProdFromProgramacion(idprod, cb){
	conn("SELECT * from program1 where productoid="+idprod, cb);
}

function getProdFromConsumibles(idprod, cb){
	conn("select * from consumi where producid="+idprod, cb);
}

function getMatepFromConsumibles(idmatep, cb){
	conn("select * from consumi where matepid="+idmatep, cb);
}

function getFormuladoFromProductos(idformulado, cb){
	conn("select * from produc where idFormulado="+idformulado, cb);
}