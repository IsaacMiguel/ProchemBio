var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	insertCargo: insertCargo,
	getCargoPorId: getCargoPorId,
	updateCargo: updateCargo,
	delCargo: delCargo,
	getAllActivos:getAllActivos,
	getCargoPorDescripcion: getCargoPorDescripcion
	}

function getAll(cb){
	conn('select * from Cargos', cb);
}

function getAllActivos(cb){
	conn('select * from cargos where activa = 1 order by descripcion', cb);
}

function insertCargo(descripcion, activa, cb){
	conn("insert into Cargos( descripcion, activa) values('"+descripcion+"',"+activa+")", cb);
}

function getCargoPorId(id, cb){
	conn("select * from Cargos where id ="+id, cb);
}

function getCargoPorDescripcion(descripcion, cb){
	conn("select * from cargos where descripcion="+ descripcion, cb);
}

function updateCargo(id, descripcion, activa, cb){
	conn("UPDATE Cargos SET descripcion='"+descripcion+"', activa='"+ activa+"' where id="+id, cb);
}

function delCargo(id, cb){
	conn("DELETE from Cargos where id="+id , cb);
}