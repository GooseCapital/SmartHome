var deviceModel = require('../model/device');
var helper = require('../helper')

module.exports.addDevice = async (req, res) => {
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

module.exports.viewDevice = async (req, res) => {
    let device = await deviceModel.GetDevice();
    //let user = await user.getUserInfo();
    let type = await deviceModel.GetType();
    let output = `<div class="table-responsive"> <table class="table"> <thead> <tr> <th class="text-center">#</th> <th>Mã thiết bị</th><th>Mã bảo mật</th> <th>Tên thiết bị</th> <th>Thời gian tạo</th> <th>Kiểu thiết bị</th> <th class="text-right">Tuỳ chọn</th> </tr></thead> <tbody>`;
    let i = 0;
    let str1 = "";
    for (i = 0; i < device.length; i++) {
        str1 += `<tr>
        <td class="text-center">
            ${i+1}
        </td>
        <td>
            ${device[i].id_device}
        </td>
        <td>
            ${device[i].security_code}
        </td>
        <td>
            ${device[i].name}
        </td>
        <td>
            ${helper.convertTimestampToDate(device[i].create_date)}
        </td>
        <td>
            ${helper.GetTypeDeviceName(device[i].type, type)}
        </td>
        <td class="td-actions text-right">
            <div class="ripple-container"></div></button>
            <button type="button" rel="tooltip" class="btn btn-success btn-round" onclick="update('${device[i].id_device}')" title="Sửa">
                <i class="material-icons">edit</i>
            </button>
            <button type="button" rel="tooltip" class="btn btn-danger btn-round" onclick="deleteDevice('${device[i].id_device}')" title="Xoá">
                <i class="material-icons">close</i>
            </button>
        </td>
        </tr>`
    }
    return res.send(output + str1 + `</tbody></table>`);
}

module.exports.ModifyDevice = async (req, res) => {
    let id_device = req.body.id_device;
    let name = req.body.name;
    let flag = await deviceModel.ModifyName(id_device, name);
    if (flag)
        return res.json({
            'status': 0,
            'id_device': id_device,
            'name': name
        });
    else
        return res.json({
            'status': 1
        });
}

module.exports.DeleteDevice = async (req, res) => {
    let id_device = req.body.id_device;
    let flag = await deviceModel.RemoveDevice(id_device);
    if (flag)
        return res.json({
            'status': 0
        });
    else
        return res.json({
            'status': 1
        });
}

module.exports.UpdateValue = async (req, res) => {
    let id_device = req.params.id_device;
    let value = req.params.value;
    let flag = await deviceModel.UpdateValue(id_device, value);
    if (flag) {
        return res.json({
            'status': 0,
            'value': value
        })
    } else {
        return res.json({
            'status': 1
        })
    }
}