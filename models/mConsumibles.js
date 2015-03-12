var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	insert: insert,
	getConsumiblePorId: getConsumiblePorId,
	updateCargo: updateCargo,
	del: del,
	getConsuPorIdProd: getConsuPorIdProd
	}

function getAll(cb){
	conn('select * from consumi', cb);
}

function insert(idproducto, idmatep, cantidad, cb){
	conn("insert into consumi(producid, matepid, cantidad) values('"+idproducto+"',"+idmatep+", "+cantidad+")", cb);
}

function getConsumiblePorId(id, cb){
	conn("select * from consumi where id ="+id, cb);
}

function getCargoPorDescripcion(descripcion, cb){
	conn("select * from consumi where descripcion="+ descripcion, cb);
}

function updateCargo(id, descripcion, activa, cb){
	conn("UPDATE consumi SET descripcion='"+descripcion+"', activa='"+ activa+"' where id="+id, cb);
}

function del(id, cb){
	conn("DELETE from consumi where id="+id , cb);
}

function getConsuPorIdProd(prodid, cb){
	conn("select * from consumi where producid="+prodid, cb);
}