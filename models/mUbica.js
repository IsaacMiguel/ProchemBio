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
	conn('select ubica.*, naves.nombre as navetxt from ubica left join naves on naves.id = ubica.id_nave_fk', cb);
}

function getAllActivos(cb){
	conn("select * from ubica where activa = 1 order by nombre", cb);
}

function insert(codigo, nombre, activa, nave, alto, ancho, coordx, coordy, red, green, blue, cb){
	conn("insert into ubica( codigo, nombre, activa, id_nave_fk, alto, ancho, coordx, coordy, red, green, blue) values('"+ codigo +"', '"+ nombre +"', "+ activa +", "+ nave +", "+ alto +", "+ ancho +", "+ coordx +", "+ coordy +", "+ red +", "+ green +", "+ blue +")", cb);
}

function getUbicaPorId(id, cb){
	conn("select * from ubica where id ="+id, cb);
}

function getUbicaPorDescripcion(descripcion, cb){
	conn("select * from ubica where descripcion="+ descripcion, cb);
}

function update(id, codigo, nombre, activa, nave, alto, ancho, coordx, coordy, red, green, blue, cb){
	conn("UPDATE ubica SET codigo='"+codigo+"', nombre='"+nombre+"', activa='"+ activa+"', id_nave_fk="+nave+", alto="+alto+", ancho="+ancho+", coordx="+coordx+", coordy="+coordy+", red="+red+", green="+green+", blue="+blue+" where id="+id, cb);
}

function del(id, cb){
	conn("DELETE from ubica where id="+id , cb);
}