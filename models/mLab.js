var conn = require('../config/db').conn;

module.exports = {
	insert: insert,
	}

function insert(id, conceori, concepla, cb){
	conn("update remitomp set conceori ="+conceori+", concepla="+concepla+" where id ="+id, cb);
}