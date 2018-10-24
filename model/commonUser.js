var mysql = require('./mysql');

module.exports = {
    checklogin: async (username, password, callback) => {
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
        },

        registerUser: async (username, password, email, callback) => {
            // câu lệnh sql để kiểm tra username tồn tại
            let sql = `SELECT * FROM users WHERE username = ?`;
            // câu lệnh sql để kiểm tra email tồn tại
            let sql2 = `SELECT * FROM users WHERE email = ?`;

            let rows = await mysql.query(sql, [username]);
            let rows2 = await mysql.query(sql2, [email]);
            if (rows[0])
                return callback("user");
            if (rows2[0])
                return callback("email");
            let sqlInsert = `INSERT INTO users (username, password, email) VALUES (?, ?, ?)`;
            await mysql.query(sqlInsert, [username, password, email]);
            return callback("ok");
        }
};