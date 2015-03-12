var conn = require('../config/db').conn;

module.exports = {
	getAccesosPorUsuario: getAccesosPorUsuario,
	getMenues: getMenues,
	getAccesos: getAccesos,
	addAccesos: addAccesos,
	insertAcceso: insertAcceso
}

function getAccesosPorUsuario(idusuario, cb){
	conn('select * from secr2 where unica='+idusuario, cb);
}

function getMenues(cb){
	conn("select * from ayuda", cb)
}

function getAccesos(cb){
	conn("select * from accesos", cb)
}

function insertAcceso(idusuario, menu, cb){
	conn("insert into secr2(unica, menu, a, b, c, m) values ("+idusuario+", "+menu+",0, 0, 0, 0);", cb)
}

function addAccesos(idusuario, accesos, cb){
	//console.log(accesos.length-1)
	conn('DELETE FROM secr2 where unica='+idusuario, cb);
	for (i = 1; i <= accesos.length-1; i++) { 
		//console.log(accesos[i])
		//console.log(accesos.length)
		//console.log("menu " + accesos[i][1].menu)
		if (accesos[i][0].checked == true)
			alta = 1;
		else
			alta = 0;

		if(accesos[i][1].checked == true)
			baja = 1;
		else
			baja = 0;
		if(accesos[i][2].checked == true)
			modificacion = 1;
		else
			modificacion = 0;
		if(accesos[i][3].checked == true)
			consulta = 1;
		else
			consulta = 0;
		conn("INSERT INTO secr2 (unica, menu, a, b, c, m) values ("+idusuario+", "+accesos[i][1].menu+", "+alta+", "+baja+", "+modificacion+", "+consulta+")", cb);
		//console.log("inserto")
	}
}

//esto es lo que programo ivan
	//hacer un select de usuario filtrando por idusuario, si existe el usuario tengo que updatear, sino hacer el insert.
	//getAccesosPorUsuario(idusuario, function(docs){
	//	console.log(docs);
	//	if (docs != null){
			//update
	//		conn('DELETE FROM secr2 where unica='+idusuario, cb);
	//		//insert
	//		var query = 'INSERT INTO secr2(unica, menu, a, b, m, c) VALUES';
	//		for (var i = 1; i <= docs.length - 1; i++) {
	//			var menu = accesos[i];
	//			query += '('+idusuario+','+i;
	//			for (var c = 0, len = menu.length; c < len; c++) {
	//				query += ',' + menu[c].checked;
	//			}
	///			query += i == 4 ? ');' : '),';
	//		}
	///		conn(query, cb);
	//	}else{
	//		//insert
	//		var query = 'INSERT INTO secr2(unica, menu, a, b, m, c) VALUES';
	//		for (var i = 1; i <= 4; i++) {
	///			var menu = accesos[i];
		//		query += '('+idusuario+','+i;
		///		for (var c = 0, len = menu.length; c < len; c++) {
			//		query += ',' + menu[c].checked;
			//	}
			//	query += i == 4 ? ');' : '),';
		//	}
		//	conn(query, cb);
	//	}
	//});

function updateAcceso (idU, o) {
	console.log("UPDATE secr2 SET a = '" + o.a + "', b = '" + o.b + "', c = '" + o.c + "', m = '" + o.m + "' WHERE unica = '" + idU + "' and menu = '" + o.idMenu  + "'");
}

function updateAccesosAll (idU, os) {
	for (var i in os) {
		updateAcceso (idU, os[i])
	}
} 
