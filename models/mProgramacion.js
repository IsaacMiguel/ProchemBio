var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getCodigo: getCodigo,
	postResultado: postResultado,
	insert: insert,
	del: del,
	getRemitos: getRemitos,
	getPA: getPA,
	getProgPorId: getProgPorId,
	getProg1PorId_joined_w_Clientes_Reacto_Formulado_Tanque_and_Empleados: getProg1PorId_joined_w_Clientes_Reacto_Formulado_Tanque_and_Empleados,
	postp2: postp2,
	limpiarp2: limpiarp2,
	getProgramaciones: getProgramaciones,
	updateMaximo: updateMaximo,
	updateFormuladorFinal: updateFormuladorFinal,
	getProg2Poridp1JoinMatepPA: getProg2Poridp1JoinMatepPA
}

function getAll(cb){
	conn("select program1.*, DATE_FORMAT(program1.fechaP, '%d/%m/%Y') as fechapf, clientes.nombre as nombrecliente, reacto.nombre as nombrereacto, formulados.nombre as nombreformulado, tanques.nombre as nombretanque from program1 left join clientes on clientes.codigo = program1.clienteid left join formulados on formulados.id = program1.formuladoid left join tanques on tanques.id = program1.tanqueid left join reacto on reacto.id = program1.reactoid", cb);
}

function getCodigo(lote, anio, clienteid, formid, cb){
	loteanio = lote + anio;
	conn("select max(lote) as maxlote from program1 where left(lote, 5) = '"+loteanio+"' AND clienteid = "+clienteid+" and formuladoid = "+formid, cb)
}

function updateMaximo(id, maximo, cb){
	conn("UPDATE program1 SET maximo ="+maximo+" where id="+id, cb);
}

function updateFormuladorFinal(id, formfinal, cb){
	conn("UPDATE program1 SET formuladorfinal="+formfinal+" where id="+id, cb);
}

function postResultado(id, resul, cb){
	conn("UPDATE `program1` SET `resultado`="+resul+" WHERE id="+id, cb)
}

function insert(fecha, fechar, turno, idcliente, formulado, formulador, equipo, tanquedestino, lote, envase, maximo, concepla, concepf, idremito, cb){
	conn("INSERT INTO program1(fechap, fechar, turno, clienteid, formuladoid, formulador, reactoid, tanqueid, lote, id_envase_fk, maximo, concepla, concepf, id_remito_fk) VALUES('"+fecha+"', '"+fechar+"', '"+turno+"', "+idcliente+", "+formulado+", "+formulador+", "+equipo+", "+tanquedestino+", '"+lote+"', "+envase+", "+maximo+", "+concepla+", "+concepf+", "+idremito+")", cb);
}

function getProgPorId(id, cb){
	conn("select program1.*, clientes.nombre as nombrecliente, reacto.nombre as nombrereacto, formulados.nombre as nombreformulado, tanques.nombre as nombretanque, envases.nombre as nombreenvase from program1 left join envases on envases.id = program1.id_envase_fk left join clientes on clientes.codigo = program1.clienteid left join formulados on formulados.id = program1.formuladoid left join tanques on tanques.id = program1.tanqueid left join reacto on reacto.id = program1.reactoid where program1.id = "+ id, cb);
}

function getProg1PorId_joined_w_Clientes_Reacto_Formulado_Tanque_and_Empleados(id, cb){
	conn("select program1.*, clientes.nombre as nombrecliente, reacto.nombre as nombrereacto, formulados.nombre as nombreformulado, tanques.nombre as nombretanque, emple.nombre as nombreemple from program1 left join emple on emple.codigo = program1.formulador left join reacto on reacto.id = program1.reactoid left join clientes on clientes.codigo = program1.clienteid left join formulados on formulados.id = program1.formuladoid left join tanques on tanques.id = program1.tanqueid where program1.id = "+ id, cb);
}

function del(id, cb){
	conn("DELETE FROM program1 WHERE id = "+id, cb);
}

function getRemitos(idcliente, idmatep, cb){
	conn("select remitomp.*, ubica.nombre as nubica from remitomp left join ubica on ubica.id = remitomp.ubicaid where tipo = 1 and clienteid = "+idcliente+" and matepid="+idmatep+" and concepla <> 0 order by fechar desc", cb)
}

function getPA(idform, cb){
	conn("select receta.*, matep.nombre as mpnombre from receta left join matep on matep.id = receta.matepid where receta.producid = "+idform+" and matep.pactivo = 1" , cb);
}

function postp2(idprog, matepid, peso_obj, lote, cb){
	conn("insert into program2(id_p1_fk, id_matep_fk, lote_mp, peso_obj, pulso_obj, pulso_real, hora_inicio, hora_fin, t_inicio, t_fin, ph_inicio, ph_fin) values("+idprog+", "+matepid+", '"+lote+"', "+peso_obj+", 0, 0, '00:00', '00:00', 0, 0, 0, 0)", cb);
}

function limpiarp2(idprog1, cb){
	conn("delete from program2 where id_p1_fk="+idprog1, cb);
}

function getProgramaciones(fecha, cb){
	conn("select program1.*, DATE_FORMAT(program1.fechaP, '%d/%m/%Y') as fechapf, clientes.nombre as nombrecliente, reacto.nombre as nombrereacto, formulados.nombre as nombreformulado, tanques.nombre as nombretanque from program1 left join clientes on clientes.codigo = program1.clienteid left join formulados on formulados.id = program1.formuladoid left join tanques on tanques.id = program1.tanqueid left join reacto on reacto.id = program1.reactoid where program1.fechaP = '"+ fecha +"'", cb);
}

function getProg2Poridp1JoinMatepPA(idp1, cb){
	conn("select program2.* from program2 left join matep on matep.id = program2.id_matep_fk where program2.id_p1_fk = "+idp1+" and matep.pactivo = 1", cb);
}