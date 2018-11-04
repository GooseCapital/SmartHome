var mysql = require('../model/mysql');

module.exports.addDevice = async (device) =>{
    let query = `INSERT INTO device (id_device, name, user_id, type, create_date, security_code) VALUES (?,?,?,?,?,?)`;
    await mysql.query(query, [device.id_device, device.name, device.user_id, device.type, Math.round(new Date().getTime()/1000), device.security_code]);
};

module.exports.checkDeviceId = async (device_id) =>{
    let sql = `SELECT * FROM device WHERE id_device = ?`;
    let rows = await mysql.query(sql, [device_id]);
    if (rows[0]){
        return true;
    }
    return false;
}

module.exports.CheckType = async (type) => {
    let sql = `SELECT * FROM type_device WHERE id = ?`;
    let rows = await mysql.query(sql, [type]);
    if (rows[0]){
        return true;
    }
    return false;
}