var express = require('express');
var router = express.Router();
var apiController = require('../controllers/apiController')

module.exports = function () {
    router.get('/', isLogin, function (req, res) {
        res.redirect('/')
    });
    router.post('/addDevice', apiController.addDevice);
    return router;
}

function isLogin(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else
        res.redirect('/users/login');
}