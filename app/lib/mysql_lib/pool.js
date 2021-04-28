var mysql = require('mysql2');

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'db0.123456',
    database: 'carpark'
});

module.exports = pool;
