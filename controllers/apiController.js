var deviceModel = require('../model/device');

module.exports = {
    addDevice: async (req, res) => {
        var message = "";
        var status = 0;
        try {
            //Check Input Json
            let id_device = req.body.id_device;
            let name = req.body.name;
            let user_id = req.user.id;
            let type = req.body.type;
            let security_code = req.body.security_code;
            if (id_device == null || name == null || type == null || user_id == null || security_code == null) {
                throw 'Wrong Input';
            }

            //check device_id exist
            let exist = await deviceModel.checkDeviceId(id_device);
            if (exist) {
                throw 'Id exist';
            }

            exist = await deviceModel.CheckType(type);
            if (!exist) {
                throw 'Type not exist';
            }

            let json = {
                'id_device': id_device,
                'name': name,
                'user_id': user_id,
                'type': type,
                'security_code': security_code
            }

            //Add Device
            await deviceModel.addDevice(json);
            message = json;

        } catch (err) {
            if (typeof err.message != 'undefined') {
                message = err.message;
                status = 1;
            } else {
                message = err;
                status = 1
            }
        }
        return res.json({
            'status': status,
            'message': message
        });
    }
}