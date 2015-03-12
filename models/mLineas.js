var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	insert: insert,
	getLineaPorId: getLineaPorId,
	update: update,
	del: del,
	}

function getAll(cb){
	conn('select * from lineas', cb);
}

function insert(codigo, nombre, cb){
	conn("insert into lineas(codigo, nombre, activa) values ('"+ codigo + "', '"+ nombre +"', 1)", cb);
}

function getLineaPorId(id, cb){
	conn("select * from lineas where id =" + id, cb);
}

function update(id, codigo, nombre, activa, cb){
	conn("update lineas set codigo='"+codigo+"', nombre='"+nombre+"', activa="+activa+" where id ="+id, cb)
}

function del(id, cb){
	conn("delete from lineas where id="+id, cb);
}