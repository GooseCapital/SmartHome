var mysql = require('mysql');
var util = require('util')

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'smarthome'
});
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    if (connection) connection.release()
    return
});

pool.query = util.promisify(pool.query) // Magic happens here.
module.exports = pool;

module.exports.addFbUser = async (user) => {
    let query = `INSERT INTO users (email, fbid, image, fbName) VALUES ('${user.email}', ${user.fbid}, '${user.image}', '${user.fbName}')`;
    await pool.query(query);
};