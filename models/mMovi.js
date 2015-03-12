var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	add: add,
	getUltimo: getUltimo
	}

function getAll(cb){
	conn('select * from lineas', cb);
}

function add(fecha, idusuario, cb){
	conn("INSERT INTO movi(fecha,usuario) VALUES ('"+fecha+"',"+idusuario+")", cb);
}

function getUltimo(cb){
	conn("select max(id) as id from movi", cb);
}