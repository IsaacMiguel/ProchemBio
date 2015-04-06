var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getAllActivos: getAllActivos,
	insert: insert,
	getUltimo: getUltimo,
	getEmplePorCodigo: getEmplePorCodigo,
	getEmplePorLegajo: getEmplePorLegajo,
	update: update,
	delEmple: delEmple
}

function getAll(cb){
	conn('select * from emple order by codigo', cb);
}

function getAllActivos(cb){
	conn('select emple.*, cargos.descripcion from emple left join cargos on cargos.id = emple.cargo where emple.activa=1 order by nombre', cb);
}

function insert(codigo, nombre, falta, fbaja, cargo, activa, cb){
	conn("insert into emple(nombre, falta, fbaja, cargo, activa) values('"+nombre+"','"+falta+"', '"+fbaja+"', '"+cargo+"',"+ activa+")", cb)
}

function getUltimo(cb){
	conn("select max(codigo) as max from emple", cb);
}

function getEmplePorCodigo(codigo, cb){
	conn("select * from emple where codigo="+ codigo, cb);
}

function getEmplePorLegajo(legajo, cb){
	conn("select * from emple where legajo="+ legajo, cb);
}

function update(codigo, nombre, falta, fbaja, cargo, activa, cb){
	conn("update emple set nombre='"+nombre+"', falta='"+falta+"', fbaja='"+fbaja+"', cargo='"+cargo+"', activa="+activa+" where codigo="+ codigo, cb);
}

function delEmple(codigo, cb){
	conn("delete from emple where codigo="+codigo, cb);
}