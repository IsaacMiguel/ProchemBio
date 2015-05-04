var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getAllActivos: getAllActivos,
	insert: insert,
	getEnvasePorId: getEnvasePorId,
	update: update,
	del: del
}

function getAll(cb){
	conn('select * from envases', cb);
}
function getAllActivos(cb){
	conn("select * from envases where activa = 1 order by nombre", cb);
}

function insert(codigo, nombre, umed, capacidad, uxpallet, activo, cb){
	conn("insert into envases(codigo, nombre, umed, capacidad, uxpallet, activa) values('"+codigo+"', '"+nombre+"','"+ umed+"',"+capacidad+", "+uxpallet+", "+ activo+")", cb)
}

function getEnvasePorId(id, cb){
	conn("select * from envases where id ="+id, cb);
}

function update(id, codigo, nombre, umed, capacidad, uxpallet, activo, cb){
	conn("update envases set codigo='"+codigo+"', nombre='"+nombre+"', umed='"+umed+"', capacidad="+capacidad+", uxpallet="+uxpallet+", activa="+activo+" where id="+id, cb);
}

function del(id, cb){
	conn("delete from envases where id="+id, cb);
}