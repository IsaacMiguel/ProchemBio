var conn = require('../config/db').conn;

module.exports = {
	getAllMatepPorCliente: getAllMatepPorCliente,
	getAllActivasPorCliente: getAllActivasPorCliente,
	getUltimo: getUltimo,
	insertMatep: insertMatep,
	getMatepPorCodigoParaCadaCliente: getMatepPorCodigoParaCadaCliente,
	getMatepPorNombreParaCadaCliente: getMatepPorNombreParaCadaCliente,
	getMatepPorId: getMatepPorId,
	updateMatep: updateMatep,
	delMatep: delMatep,
	getAllActivas: getAllActivas,
	getAllActivasPorIdCliente: getAllActivasPorIdCliente,
	verificacionCodigos: verificacionCodigos
}

function getAllMatepPorCliente(cdcliente, cb){
	conn("select * from matep where cdcliente=" + cdcliente, cb);
}

function getAllActivasPorCliente(cdcliente, cb){
	conn("select * from matep where activa = 1 and cdcliente=" + cdcliente + " order by nombre", cb);
}

function getAllActivas(cb){
	conn("select * from matep where activa = 1 order by nombre", cb);
}

function getUltimo(cdcliente, cb){
	conn("select max(codigo) as max from matep where cdcliente="+ cdcliente, cb)
}

function insertMatep(codigo, cdcliente, umed, nombre, pactivo, cb){
	conn("insert into matep(codigo, cdcliente, umed, nombre, activa, pactivo) values('"+codigo+"', "+cdcliente+", '"+umed+"', '"+nombre+"', 1, "+pactivo+") ", cb);
}

function getMatepPorCodigoParaCadaCliente(codigo, cdcliente, cb){
	conn("select codigo from matep where codigo ='"+codigo +"' AND cdcliente="+ cdcliente, cb);
}

function getMatepPorNombreParaCadaCliente(nombre, cdcliente, cb){
	conn("select nombre from matep where nombre='"+nombre+"' AND cdcliente="+ cdcliente, cb);
}

function getMatepPorId(id, cb){
	conn("select * from matep where id="+id, cb);
}

function updateMatep(id, cdcliente, codigo, nombre, activo, pactivo, umed, cb){
	if (activo == 1)
		conn("update matep set cdcliente="+cdcliente+", codigo='"+codigo+"', nombre='"+nombre+"', activa=1, pactivo="+pactivo+", umed='"+umed+"' where id="+id, cb);
	else
		conn("update matep set cdcliente="+cdcliente+", codigo='"+codigo+"', nombre='"+nombre+"', activa=0, pactivo="+pactivo+", umed='"+umed+"' where id="+id, cb);
}

function delMatep(id, cb){
	conn("DELETE from matep where id="+id, cb);
}

function getAllActivasPorIdCliente(idcliente, cb){
	conn("SELECT * from matep where activa=1 and cdcliente="+idcliente, cb);
}

function verificacionCodigos(id, codigo, cb){
	conn("select * from matep where codigo = '"+codigo+"' AND id <> "+id, cb);
}
