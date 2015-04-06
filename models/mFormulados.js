var conn = require('../config/db').conn;

module.exports = {
	getAllFormuladoPorCliente: getAllFormuladoPorCliente,
	getAll: getAll,
	getUltimo: getUltimo,
	insertFormulado: insertFormulado,
	getFormuladoPorCodigoParaCadaCliente: getFormuladoPorCodigoParaCadaCliente,
	getFormuladoPorNombreParaCadaCliente: getFormuladoPorNombreParaCadaCliente,
	getcdClientePorIdFormulado: getcdClientePorIdFormulado,
	getFormuladoPorId: getFormuladoPorId,
	updateFormulado: updateFormulado,
	delFormulado: delFormulado,
	getAllActivosPorCliente:getAllActivosPorCliente,
	getAbLotePorIDProd:getAbLotePorIDProd,
	verificacionCodigo: verificacionCodigo,
	getFormsPorIdCliente: getFormsPorIdCliente,
	getAbLotePorIDForm: getAbLotePorIDForm
}

function getAllFormuladoPorCliente(cdcliente, cb){
	conn("select * from Formulados where cdcliente=" + cdcliente+" order by nombre", cb);
}

function getAll(cb){
	conn("select * from Formulados", cb);
}

function getUltimo(cdcliente, cb){
	conn("select max(codigo) as max from Formulados where cdcliente="+ cdcliente, cb)
}

function insertFormulado(codigo, cdcliente, lote, umed, nombre, concentracion, cb){
	conn("insert into Formulados(codigo, cdcliente, AbLote, umed, nombre, activa, concentracion) values('"+codigo+"',"+cdcliente+", '"+ lote +"',  '"+umed+"', '"+nombre+"', 1, "+concentracion+") ", cb);
}

function getFormuladoPorCodigoParaCadaCliente(codigo, cdcliente, cb){
	conn("select count(codigo) as cantidad from Formulados where codigo ='"+codigo +"' AND cdcliente="+ cdcliente, cb);
}


function getFormuladoPorNombreParaCadaCliente(nombre, cdcliente, cb){
	conn("select nombre from Formulados where nombre='"+nombre+"' AND cdcliente="+ cdcliente, cb);
}

function getcdClientePorIdFormulado(id, cb){
	conn("select cdcliente from Formulados where id="+id, cb);
}

function getFormuladoPorId(id, cb){
	conn("select * from Formulados where id="+id, cb);
}

function updateFormulado(id, cdcliente, codigo, nombre, lote, umed, activo, concentracion, cb){
	conn("update Formulados set cdcliente="+cdcliente+", codigo='"+codigo+"', nombre='"+nombre+"', AbLote='"+lote+"', umed='"+umed+"', activa="+activo+", concentracion="+concentracion+" where id="+id, cb);
}

function delFormulado(id, cb){
	conn("DELETE from Formulados where id="+id, cb);
}

function getAllActivosPorCliente(id, cb){
	conn("SELECT * from Formulados where cdcliente="+ id +" and activa = 1 order by nombre", cb);
}

function getAbLotePorIDProd(id, cb){
	conn("SELECT * from Formulados where id="+id, cb);
}

function verificacionCodigo(id, codigo, cb){
	conn("select * from Formulados where codigo = '"+codigo+"' AND id <> "+id, cb);
}

function getFormsPorIdCliente(cdcliente, cb){
	conn("select * from formulados where cdcliente="+cdcliente+" order by nombre", cb);
}

function getAbLotePorIDForm(id, cb){
	conn("SELECT * from Formulados where id="+id, cb);
}
