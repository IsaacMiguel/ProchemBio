var conn = require('../config/db').conn;

module.exports = {
	getRecetaPorIdFormulado: getRecetaPorIdFormulado,
	insert: insert,
	getFormuladoIdPorIdReceta: getFormuladoIdPorIdReceta,
	getRecetaPorId: getRecetaPorId,
	del: del,
	updatePorceYUsaLote: updatePorceYUsaLote
}

function getRecetaPorIdFormulado(id, cb){
	conn("select * from receta where producid=" + id+" order by orden", cb);
}

function insert(idproducto, matep, porcentaje, formula, soloporce, usalote, orden, cb){
	conn("insert into receta (producid, matepid, porce, formula, soloporce, usalote, orden) values ("+idproducto+", "+matep+", "+porcentaje+", formula, "+soloporce+", "+usalote+", "+orden+")", cb);
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

function updatePorceYUsaLote(id, porce, usalote, orden, cb){
	conn("update receta SET porce = "+porce+", usalote="+usalote+", orden="+orden+" where id="+id, cb);
}