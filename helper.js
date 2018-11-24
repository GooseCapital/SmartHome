var constant = require('./constants')
module.exports.convertTimestampToDate = (date) => {
    var s = new Date(date * 1000).toLocaleDateString("vi-VN");
    return s;
}

module.exports.GetTypeDeviceName = (number, array) => {
    let output = "Not Found"
    array.forEach(element => {
        if (element.id == number)
            output = element.name;
    });
    return output;
}

module.exports.CheckLogin = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else
        res.redirect('/users/login');
}

module.exports.CheckAuthedUser = (req, res, next)=>{
    let flag = false;
    if (req.isAuthenticated()) {
        constant.authedID.forEach(element => {
            if (req.user.role == element){
                flag = true;
            }
        });
    }
    if (flag)
        return next();
    else
        return res.send("Not Permission");
}