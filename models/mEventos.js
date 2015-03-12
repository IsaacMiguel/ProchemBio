var conn = require('../config/db').conn;

module.exports = {
	add: add
}

function add(idusuario, fecha, evento, observ, cb){
	conn("INSERT INTO eventos(idusuario, fecha, evento, observ) VALUES("+idusuario+", '"+fecha+"','"+evento+"', '"+observ+"')", cb);
}
