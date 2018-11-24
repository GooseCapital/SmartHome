var mysql = require('../model/mysql');

module.exports.addDevice = async (device) => {
    let query = `INSERT INTO device (id_device, name, user_id, type, create_date, security_code) VALUES (?,?,?,?,?,?)`;
    await mysql.query(query, [device.id_device, device.name, device.user_id, device.type, Math.round(new Date().getTime() / 1000), device.security_code]);
};

module.exports.checkDeviceId = async (device_id) => {
    let sql = `SELECT * FROM device WHERE id_device = ?`;
    let rows = await mysql.query(sql, [device_id]);
    if (rows[0]) {
        return true;
    }
    return false;
}

module.exports.CheckType = async (type) => {
    let sql = `SELECT * FROM type_device WHERE id = ?`;
    let rows = await mysql.query(sql, [type]);
    if (rows[0]) {
        return true;
    }
    return false;
}

module.exports.GetDevice = async () => {
    let sql = `SELECT * FROM device`;
    let rows = mysql.query(sql);
    return rows;
}

module.exports.GetType = async () => {
    let sql = `SELECT * FROM type_device`
    let rows = await mysql.query(sql);
    return rows;
}

module.exports.ModifyName = async (id_device, name) => {
    let flag = false;
    let sql = `UPDATE device SET name = ? WHERE id_device = ?`
    let rows = await mysql.query(sql, [name, id_device]);
    rows = await mysql.query("SELECT name FROM device WHERE id_device = ?", [id_device]);
    if (rows) {
        if (rows[0].name == name)
            flag = true;
    }
    return flag;
}

module.exports.RemoveDevice = async (id_device) => {
    let flag = false;
    let sql = `DELETE FROM device WHERE id_device = ?`;
    let rows = await mysql.query(sql, [id_device]);
    if (rows.affectedRows > 0)
        flag = true;
    return flag;
}

module.exports.UpdateValue = async (id_device, value) => {
    let flag = false;
    let sql = `UPDATE device SET value = ? WHERE id_device = ?`
    let rows = await mysql.query(sql, [value, id_device]);
    rows = await mysql.query("SELECT value FROM device WHERE id_device = ?", [id_device]);
    if (rows) {
        if (rows[0].value == value)
            flag = true;
    }
    return flag;
}