var conn = require('../config/db').conn;

module.exports = {
	getFormsEnReactor: getFormsEnReactor,
	insert: insert,
	getFormPorIdFormEnReactor: getFormPorIdFormEnReactor,
	del: del,
	getFORMENREACTORporIDREACTOR: getFORMENREACTORporIDREACTOR,
	getFormEnReactorPorID: getFormEnReactorPorID,
	getIDFORMENTANQEporIDREACTOR: getIDFORMENTANQEporIDREACTOR,
	getFORMENREACTORporIDREACTOR: getFORMENREACTORporIDREACTOR,
	update: update,
	getFORMENREACTORporIDREACTOyIDFORM: getFORMENREACTORporIDREACTOyIDFORM
}

function getFormsEnReactor(idform, cb){
	conn("select formenreactor.*, reacto.nombre as rnombre, reacto.codigo as rcodigo from formenreactor left join reacto on reacto.id = formenreactor.id_reacto_fk where id_form_fk=" + idform, cb);
}

function insert(idform, idreactor, maxima, cb){
	conn("INSERT INTO FORMENREACTOR(id_form_fk, id_reacto_fk, maximo) values("+idform+","+idreactor+","+maxima+")", cb);
}

function getFormPorIdFormEnReactor(idformenreactor, cb){
	conn("SELECT id_form_fk from formenreactor where id ="+idformenreactor, cb);
}

function del(id, cb){
	conn("DELETE FROM formenreactor where id ="+ id, cb);
}

function getFORMENREACTORporIDREACTOR(idform, idreactor, cb){
	conn("SELECT * from formenreactor where id_reacto_fk="+idreactor, cb);
}

function getFormEnReactorPorID(id, cb){
	conn("SELECT formenreactor.*, reacto.nombre as rnombre from formenreactor left join reacto on reacto.id = formenreactor.id_reacto_fk where formenreactor.id = "+ id, cb);
}

function getIDFORMENTANQEporIDREACTOR(idreactor, cb){
	conn("SELECT id from formenreactor where id_reacto_fk ="+idreactor, cb);
}

function update(idformenreactor, idform, idreactor, maximo, cb){
	conn("UPDATE formenreactor SET id_form_fk="+idform+", id_reacto_fk="+idreactor+", maximo="+maximo+" where id="+idformenreactor, cb);
}

function getFORMENREACTORporIDREACTOR(idreactor, cb){
	conn("SELECT * from formenreactor where id_reacto_fk = "+ idreactor, cb);
}

function getFORMENREACTORporIDREACTOyIDFORM(idreactor, idform, cb){
	conn("SELECT * from formenreactor where id_reacto_fk="+idreactor+" and id_form_fk="+idform, cb);
}