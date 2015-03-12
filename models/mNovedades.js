var conn = require('../config/db').conn;

module.exports = {
	getLast: getLast,
	getAll: getAll
}

function getLast(cb){
	conn("SELECT * FROM version ORDER BY `fecha` DESC LIMIT 1", cb);
}

function getAll(cb){
	conn("SELECT * from version", cb);
}