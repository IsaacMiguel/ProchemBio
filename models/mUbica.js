var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getAllActivos: getAllActivos,
	insert: insert,
	getUbicaPorId: getUbicaPorId,
	update: update,
	del: del
	}

function getAll(cb){
	conn('select * from ubica', cb);
}

function getAllActivos(cb){
	conn("select * from ubica where activa = 1 order by nombre", cb);
}

function insert(codigo, nombre, activa, cb){
	conn("insert into ubica( codigo, nombre, activa) values('"+ codigo +"', '"+ nombre +"',"+ activa +")", cb);
}

function getUbicaPorId(id, cb){
	conn("select * from ubica where id ="+id, cb);
}

function getUbicaPorDescripcion(descripcion, cb){
	conn("select * from ubica where descripcion="+ descripcion, cb);
}

function update(id, codigo, nombre, activa, cb){
	conn("UPDATE ubica SET codigo='"+codigo+"', nombre='"+nombre+"', activa='"+ activa+"' where id="+id, cb);
}

function del(id, cb){
	conn("DELETE from ubica where id="+id , cb);
}