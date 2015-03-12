var conn = require('../config/db').conn;

module.exports = {
	add: add
}

function changeDate(date){
	// input: dd/mm/yyyy
	fechaus = date.substring(6,10) + "/" + date.substring(3,5) + "/" + date.substring(0,2);
	return fechaus;
	// output: yyyy/mm/dd
}

function add(user, tabla, string, cb){
	var date = new Date();
	date =  date.getFullYear() + '/' + (date.getMonth() + 1) + '/' +  date.getDate()
	conn("insert into borro(fecha, usuario, tabla, texto)values('"+date+"','"+user+"','"+tabla+"','"+string+"') ", cb);
}