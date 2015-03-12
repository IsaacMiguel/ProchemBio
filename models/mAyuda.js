var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getAyuda: getAyuda,
	getAyudaTexto: getAyudaTexto
}

function getAll(cb){
	conn('select * from ayuda', cb);
}

function getAyuda(id, cb){
	conn("select * from ayuda where id ="+id, cb);
}

function getAyudaTexto(id, cb){
	conn("select id, titulo, texto from ayuda where id="+ id, cb);
}