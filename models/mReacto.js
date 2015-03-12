var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	insert: insert,
	getReactoPorId: getReactoPorId,
	update: update,
	del: del,
	getAllActivos: getAllActivos,
	getReactorPorNombre: getReactorPorNombre
	}

function getAll(cb){
	conn('select * from reacto', cb);
}

function insert(codigo, nombre, capacidad, cb){
	conn("insert into reacto(codigo, nombre, capacidad, activa) values ('"+ codigo + "', '"+ nombre +"', "+ capacidad +", 1)", cb);
}

function getReactoPorId(id, cb){
	conn("select * from reacto where id =" + id, cb);
}

function update(id, codigo, nombre, capacidad, activa, cb){
	conn("update reacto set codigo='"+codigo+"', nombre='"+nombre+"', capacidad="+capacidad+", activa="+activa+" where id ="+id, cb)
}

function del(id, cb){
	conn("delete from reacto where id="+id, cb);
}

function getAllActivos(cb){
	conn("select * from reacto where activa = 1 order by nombre", cb);
}

function getReactorPorNombre(nombre, cb){
	conn("SELECT * from reacto where nombre='"+ nombre+"'", cb);
}