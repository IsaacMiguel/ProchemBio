var conn = require('../config/db').conn;

module.exports = {
	getRecetaPorIdFormulado: getRecetaPorIdFormulado,
	insert: insert,
	getFormuladoIdPorIdReceta: getFormuladoIdPorIdReceta,
	getRecetaPorId: getRecetaPorId,
	del: del
}

function getRecetaPorIdFormulado(id, cb){
	conn("select * from receta where producid=" + id, cb);
}

function insert(idproducto, matep, porcentaje, formula, soloporce, usalote, cb){
	conn("insert into receta (producid, matepid, porce, formula, soloporce, usalote) values ("+idproducto+", "+matep+", "+porcentaje+", formula, "+soloporce+", "+usalote+")", cb);
}

function getFormuladoIdPorIdReceta(idreceta, cb){
	conn("SELECT producid FROM `receta` WHERE id ="+idreceta, cb);
}

function getRecetaPorId(idreceta, cb){
	conn("select * from receta where id ="+ idreceta, cb);
}

function del(id, cb) {
	conn("delete from receta where id="+id, cb);
}
