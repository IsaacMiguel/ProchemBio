var conn = require('../config/db').conn;

module.exports = {
	getProgramaciones: getProgramaciones,
	getFormulado: getFormulado,
	updateDatosFormulado: updateDatosFormulado,
	getSuma: getSuma
}

function getProgramaciones(fi, ff, cb){
	conn("SELECT program1.*, DATE_FORMAT(program1.fechap, '%d/%m/%Y') as fechapf, DATE_FORMAT(program1.fechar, '%d/%m/%Y') as fecharf, clientes.nombre as nombrecliente, reacto.nombre as nombrereacto, formulados.nombre as nombreformulado, tanques.nombre as nombretanque from program1 left join clientes on clientes.codigo = program1.clienteid left join formulados on formulados.id = program1.formuladoid left join tanques on tanques.id = program1.tanqueid left join reacto on reacto.id = program1.reactoid where fechaP >='"+fi+"' and fechaP<='"+ff+"' and resultado <> 0",cb)
}

function getFormulado(id, cb){
	conn("SELECT program2.*, matep.nombre as mpnombre from program2 left join matep on matep.id=program2.id_matep_fk where program2.id_p1_fk="+id, cb);
}

function getSuma(id, cb){
	conn("select sum(peso_obj) as suma from program2 where program2.id_p1_fk="+id, cb);	
}

function updateDatosFormulado(id, lotemp, pesoobj, pulsoobj, pulsoreal, hri, hrf, tempi, tempf, phi, phf, cb){
	conn("UPDATE program2 SET lote_mp='"+lotemp+"', peso_obj="+pesoobj+", pulso_obj="+pulsoobj+", pulso_real="+pulsoreal+", hora_inicio='"+hri+"', hora_fin='"+hrf+"', t_inicio="+tempi+", t_fin="+tempf+", ph_inicio="+phi+", ph_fin="+phf+" WHERE id="+id, cb);
}