var mysql = require('mysql');
var util = require('util')

// var pool = mysql.createPool({
//     connectionLimit: 10,
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'smarthome',
//     multipleStatements: true
// });
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'us-cdbr-iron-east-01.cleardb.net',
    user: 'b74399cdef7719',
    password: 'b8c5e2d6',
    database: 'heroku_45ce012ae41eafd',
    multipleStatements: true
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
pool.on('error', function (err) {
    console.log("[mysql error]", err);
});

pool.query = util.promisify(pool.query) // Magic happens here.
module.exports = pool;


module.exports.addFbUser = async (user) => {
    let query = `INSERT INTO users (email, fbid, image, fbName, role, timeJoin) VALUES ('${user.email}', ${user.fbid}, '${user.image}', '${user.fbName}', 1, ${Math.round(new Date().getTime()/1000)})`;
    await pool.query(query);
};