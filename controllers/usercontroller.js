var userlogin = require('../model/commonUser');

module.exports.checklogin = async (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.render('login', {
            errorlogin: "Vui lòng nhập đủ thông tin"
        });
    } else {
        userlogin.checklogin(req.body.username, req.body.password, (callback)=>{
            {
                if (callback) {
                    return res.redirect('/');
                } else {
                    return res.render('login', {
                        errorlogin: 'Thông tin đăng nhập sai, vui lòng thử lại'
                    });
                }
            }
        });
    }
}