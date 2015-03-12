var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	insert: insert,
	getTanquePorId: getTanquePorId,
	update: update,
	del: del,
	getTanquePorNombre: getTanquePorNombre,
	getAllActivos: getAllActivos
	}

function getAll(cb){
	conn('select * from Tanques', cb);
}

function insert(codigo, nombre, umed, capacidad, activa, cb){
	conn("insert into Tanques(codigo, nombre, umed, capacidad, activa) values('"+codigo+"', '"+nombre+"', '"+ umed +"', "+ capacidad +", "+activa+")", cb);
}

function getTanquePorId(id, cb){
	conn("select * from Tanques where id ="+id, cb);
}

function getTanquePorDescripcion(descripcion, cb){
	conn("select * from Tanques where descripcion="+ descripcion, cb);
}

function update(id, codigo, nombre, umed, capacidad, activa, cb){
	conn("UPDATE Tanques SET codigo="+codigo+", nombre='"+nombre+"', umed='"+umed+"', capacidad="+capacidad+", activa='"+ activa+"' where id="+id, cb);
}

function del(id, cb){
	conn("DELETE from Tanques where id="+id , cb);
}
function getTanquePorNombre(nombre, cb){
	conn("SELECT * from tanques where nombre='"+ nombre+"'", cb);
}

function getAllActivos(cb){
	conn("SELECT * from tanques where activa = 1 order by nombre", cb);
}