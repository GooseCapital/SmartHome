var mysql = require('./mysql');

module.exports = {
    checklogin: async (username, password, callback) => {
        // flag để check user
        // câu lệnh sql để lấy user
        let sql = `SELECT * FROM users WHERE username = ?`;
        let rows = await mysql.query(sql, [username]);
        if (rows[0] && (rows[0].username == username)) {
            if (rows[0].password == password)
                callback(true);
            else
                callback(false);
        } else
            callback(false);
    }

    
};