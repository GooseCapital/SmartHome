var userlogin = require('../model/commonUser');

module.exports.checklogin = async (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.render('login', {
            failureFlash: "Vui lòng nhập đủ thông tin"
        });
    } else {
        userlogin.checklogin(req.body.username, req.body.password, (callback) => {
            {
                if (callback) {
                    return res.redirect('/');
                } else {
                    return res.render('login', {
                        failureFlash: 'Thông tin đăng nhập sai, vui lòng thử lại'
                    });
                }
            }
        });
    }
}

module.exports.register = async (req, res) => {
    if (!req.body.username || !req.body.password || !req.body.email) {
        return res.render('register', {
            failureFlash: "Vui lòng nhập đủ thông tin"
        });
    } else {
        userlogin.registerUser(req.body.username, req.body.password, req.body.email, (callback) => {
            if (callback == "ok")
                return res.render('register', {
                    failureFlash: "Đăng ký thành công, vui lòng đăng nhập"
                });
            if (callback == "user")
                return res.render('register', {
                    failureFlash: "Username đã tồn tại"
                });
            if (callback == "email")
                return res.render('register', {
                    failureFlash: "Email đã tồn tại"
                });
            return res.render('register', {
                failureFlash: "Có lỗi xảy ra, vui lòng thử lại sau"
            });
        })
    }
}