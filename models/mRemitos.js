var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	insert: insert,
	getRemitoPorId: getRemitoPorId,
	update: update,
	del: del,
	getRemitosEntreFechas: getRemitosEntreFechas
}

function getAll(cb){
	conn('select * from remitomp order by fechar', cb);
}

function insert(tipo, fechar, fecham, nroremito, cliente, matep, lote, envase, cantidad, neto, conceori, concepla, ubicacion, nmovi, observaciones, cb){
	if (observaciones == null)
		observaciones = "";
	conn("insert into remitomp(tipo, fechar, fecham, nremito, clienteid, matepid, lote, envaseid, cantidad, neto, conceori, concepla, ubicaid, nmovi, observaciones) values("+tipo+",'"+fechar+"', '"+fecham+"', '"+nroremito+"', "+cliente+", "+matep+", '"+lote+"', "+envase+", "+cantidad+", "+neto+", "+conceori+", "+concepla+", "+ubicacion+", "+nmovi+", '"+observaciones+"' )", cb)
}

function getRemitoPorId(id, cb){
	conn("select * from remitomp where id ="+id, cb);
}

function update(tipo, fechar, fecham, nroremito, cliente, matep, lote, envase, cantidad, neto, conceori, concepla, ubicacion, observaciones, cb){
	conn("update remitomp set tipo="+tipo+", fechar='"+fechar+"', fecham='"+fecham+"', nremito='"+nroremito+"', clienteid="+cliente+", matepid="+matep+", lote='"+lote+"', envaseid="+envase+", cantidad="+cantidad+", neto="+neto+", conceori="+conceori+", concepla="+concepla+", ubicaid="+ubicacion+", observaciones='"+observaciones+"' where id="+id, cb);
}

function del(id, cb){
	conn("delete from remitomp where id="+id, cb);
}

function getRemitosEntreFechas(finicio, ffin, cb){
	conn("SELECT remitomp.*, DATE_FORMAT(remitomp.fechar, '%d/%m/%Y') as fecharf, DATE_FORMAT(remitomp.fecham, '%d/%m/%Y') as fechamf, clientes.nombre as cnombre, matep.nombre as mpnombre, envases.nombre as enombre, ubica.nombre as unombre FROM remitomp LEFT JOIN clientes ON clientes.codigo = remitomp.clienteid LEFT JOIN matep ON matep.id = remitomp.matepid LEFT JOIN envases ON remitomp.envaseid = envases.id LEFT JOIN ubica on ubica.id = remitomp.ubicaid WHERE fechar >= '"+finicio+"' AND fechar <= '"+ffin+"'", cb);
}