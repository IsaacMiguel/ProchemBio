var conn = require('../config/db').conn;

module.exports = {
	getAllClientes: getAllClientes,
	getClientePorID: getClientePorID,
	getAllActivos: getAllActivos,
	getNombreDeClientePorId: getNombreDeClientePorId,
	insertCliente: insertCliente,
	updateCliente: updateCliente,
	delCliente: delCliente,
	getClientePorNombre: getClientePorNombre
}

function getAllClientes(cb){
	conn('select * from clientes', cb);
}

function getClientePorID(id, cb){
	conn('select * from clientes where codigo =' + id, cb);
}

function getAllActivos(cb){
	conn("select * from clientes where activa = 1 ORDER BY nombre", cb);
}

function getNombreDeClientePorId(id, cb){
	conn("select nombre from clientes where codigo =" + id, cb);
}

function getClientePorNombre(nombre, cb){
	conn("select * from clientes where nombre='" +nombre+"'", cb);
}

function insertCliente(nombre, direccion, localidad, provincia, telefono, mail, contacto, contel, concel, connex, conmail, activa, cuit, iva, claveweb, cb){
	conn("INSERT INTO clientes(nombre, direc, local, prov, telefonos, mail, contacto, contel, concel, connex, conmail, activa, cuit, iva, claveweb) VALUES('"+ nombre +"','"+ direc +"','"+ local +"','"+ prov +"','"+ telefono +"','"+ mail +"','"+ contacto +"','"+ contel + "','" + concel +"','"+ connex +"','"+ conmail + "'," + activa + ",'" + cuit + "','" + iva + "','" + claveweb + "')", cb);
}

function updateCliente(id, nombre, direccion, localidad, provincia, telefono, mail, contacto, contel, concel, connex, conmail, activa, cuit, iva, claveweb, cb){
	conn("UPDATE clientes SET nombre='"+ nombre +"', direc='"+ direc +"', local='"+ local +"', prov='"+ prov +"', telefonos='"+ telefono +"', mail='"+ mail +"', contacto='"+ contacto +"', contel='"+ contel +"', concel='"+ concel +"', connex='"+ connex +"', conmail='"+ conmail +"', activa="+ activa +", cuit='"+ cuit +"', iva="+ iva +", claveweb='"+ claveweb +"' WHERE codigo="+ id, cb);
}

function delCliente(id, cb) {
  conn("DELETE FROM clientes where codigo ="+ id, cb);
}

function getClientePorProdId(producid, cb){
	conn("SELECT * from clientes where prod")
}