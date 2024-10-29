const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'sql10.freemysqlhosting.net',
    user: 'sql10740702',
    password: 'eJT3XPY3N',
    database: 'sql10740702',
    port: 3306
});

connection.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log('Mysql conectado');
    }
});

module.exports = connection;
