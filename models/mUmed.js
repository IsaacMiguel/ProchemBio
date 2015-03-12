var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	insertUmed: insertUmed,
	getUmedPorId: getUmedPorId,
	updateUmed: updateUmed,
	delUmed: delUmed,
	getUmedPorCodigo: getUmedPorCodigo,
	getAllActivas: getAllActivas
	}

function getAll(cb){
	conn('select * from umed', cb);
}

function getAllActivas(cb){
	conn("select * from umed where activa = 1 order by nombre", cb);
}

function insertUmed(codigo, nombre, cb){
	conn("insert into umed(codigo, nombre, activa) values('"+codigo+"','"+nombre+"',1)", cb);
}

function getUmedPorId(id, cb){
	conn("select * from umed where id ="+id, cb);
}

function updateUmed(id, codigo, nombre, activo, cb){
	conn("UPDATE umed SET codigo='"+codigo+"', nombre='"+nombre+"', activa='"+ activo+"' where id="+id, cb);
}

function delUmed(id, cb){
	conn("DELETE from umed where id="+id , cb);
}

function getUmedPorCodigo(codigo, cb){
	conn("select * from umed where codigo='"+ codigo +"'", cb);
}