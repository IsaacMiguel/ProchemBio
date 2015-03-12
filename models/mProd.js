var conn = require('../config/db').conn;

module.exports = {
	getAllProdPorCliente: getAllProdPorCliente,
	getAll: getAll,
	getUltimo: getUltimo,
	insertProd: insertProd,
	getProdPorCodigoParaCadaCliente: getProdPorCodigoParaCadaCliente,
	getProdPorNombreParaCadaCliente: getProdPorNombreParaCadaCliente,
	getcdClientePorIdProducto: getcdClientePorIdProducto,
	getProdPorId: getProdPorId,
	updateProd: updateProd,
	delProd: delProd,
	getAllActivosPorCliente:getAllActivosPorCliente,
	getAbLotePorIDProd:getAbLotePorIDProd,
	verificacionCodigo: verificacionCodigo
}

function getAllProdPorCliente(cdcliente, cb){
	conn("select * from Produc where cdcliente=" + cdcliente, cb);
}

function getAll(cb){
	conn("select * from produc", cb);
}

function getUltimo(cdcliente, cb){
	conn("select max(codigo) as max from Produc where cdcliente="+ cdcliente, cb)
}

function insertProd(codigo, cdcliente, lote, umed, nombre, idformulado, cantidad, cb){
	conn("insert into Produc(codigo, cdcliente, AbLote, umed, nombre, activa, idFormulado, canFormulado) values('"+codigo+"',"+cdcliente+", '"+ lote +"',  '"+umed+"', '"+nombre+"', 1, "+idformulado+", "+cantidad+"); ", cb);
}

function getProdPorCodigoParaCadaCliente(codigo, cdcliente, cb){
	conn("select codigo from Produc where codigo ='"+codigo +"' AND cdcliente="+ cdcliente, cb);
}

function getProdPorNombreParaCadaCliente(nombre, cdcliente, cb){
	conn("select nombre from Produc where nombre='"+nombre+"' AND cdcliente="+ cdcliente, cb);
}

function getcdClientePorIdProducto(id, cb){
	conn("select cdcliente from produc where id="+id, cb);
}

function getProdPorId(id, cb){
	conn("select * from Produc where id="+id, cb);
}

function updateProd(id, cdcliente, codigo, nombre, lote, umed, activo, idformulado, cantidad, cb){
	conn("update Produc set cdcliente="+cdcliente+", codigo='"+codigo+"', nombre='"+nombre+"', AbLote='"+lote+"', umed='"+umed+"', activa="+activo+", idFormulado="+idformulado+", canFormulado="+cantidad+" where id="+id, cb);
}

function delProd(id, cb){
	conn("DELETE from Produc where id="+id, cb);
}

function getAllActivosPorCliente(id, cb){
	conn("SELECT * from produc where cdcliente="+ id +" and activa = 1 order by nombre", cb);
}

function getAbLotePorIDProd(id, cb){
	conn("SELECT * from produc where id="+id, cb);
}

function verificacionCodigo(id, codigo, cb){
	conn("select * from produc where codigo = '"+codigo+"' AND id <> "+id, cb)
}