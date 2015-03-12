var conn = require('../config/db').conn;

module.exports = {
	getMpsEnReactor: getMpsEnReactor,
	insert: insert,
	getMpPorIdMpEnReactor: getMpPorIdMpEnReactor,
	del: del,
	getMPENREACTORporIDREACTOR: getMPENREACTORporIDREACTOR,
	getMpEnReactorPorID: getMpEnReactorPorID,
	getIDMPENTANQEporIDREACTOR: getIDMPENTANQEporIDREACTOR,
	getMPENREACTORporIDREACTOR: getMPENREACTORporIDREACTOR,
	update: update,
	getMPENREACTORporIDREACTOyIDMP: getMPENREACTORporIDREACTOyIDMP
}

function getMpsEnReactor(idmp, cb){
	conn("select mpenreactor.*, reacto.nombre as rnombre, reacto.codigo as rcodigo from mpenreactor left join reacto on reacto.id = mpenreactor.idreactor where idmp=" + idmp, cb);
}

function insert(idmp, idreactor, maxima, cb){
	conn("INSERT INTO MPENREACTOR(idmp, idreactor, maximo) values("+idmp+","+idreactor+","+maxima+")", cb);
}

function getMpPorIdMpEnReactor(idmpenreactor, cb){
	conn("SELECT idmp from mpenreactor where id ="+idmpenreactor, cb);
}

function del(id, cb){
	conn("DELETE FROM mpenreactor where id ="+ id, cb);
}

function getMPENREACTORporIDREACTOR(idmp, idreactor, cb){
	conn("SELECT * from mpenreactor where idreactor="+idreactor, cb);
}

function getMpEnReactorPorID(id, cb){
	conn("SELECT mpenreactor.*, reacto.nombre as rnombre from mpenreactor left join reacto on reacto.id = mpenreactor.idreactor where mpenreactor.id = "+ id, cb);
}

function getIDMPENTANQEporIDREACTOR(idreactor, cb){
	conn("SELECT id from mpenreactor where idreactor ="+idreactor, cb);
}

function update(idmpenreactor, idmp, idreactor, maximo, cb){
	conn("UPDATE mpenreactor SET idmp="+idmp+", idreactor="+idreactor+", maximo="+maximo+" where id="+idmpenreactor, cb);
}

function getMPENREACTORporIDREACTOR(idreactor, cb){
	conn("SELECT * from mpenreactor where idreactor = "+ idreactor, cb);
}

function getMPENREACTORporIDREACTOyIDMP(idreactor, idmp, cb){
	conn("SELECT * from mpenreactor where idreactor="+idreactor+" and idmp="+idmp, cb);
}