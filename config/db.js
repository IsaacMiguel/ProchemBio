function conn(query, cb){
  var mysql = require('mysql');
 
  var connection = mysql.createConnection({
    user: 'root',
    password: '',
    host: '127.0.0.1',
    port: '3306',
    database: 'Prochem001',
    dateStrings : true
  });
console.log('/--------/ DEBUG USE /---------/');
console.log(query);
  connection.connect();
  connection.query(query, function(err, rows, fields) {
    if (err) throw err;
    //console.log(err)
    //console.log(rows)
    //console.log(fields)
    connection.end();
    cb(rows);
  });
}

exports.conn = conn