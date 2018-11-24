var express = require('express');
var router = express.Router();
var apiController = require('../controllers/apiController')
var helper = require('../helper');

module.exports = function () {
    router.get('/', helper.CheckLogin, function (req, res) {
        res.redirect('/')
    });

    router.post('/addDevice', helper.CheckLogin, apiController.addDevice);

    router.get('/viewDevice', helper.CheckLogin, apiController.viewDevice);

    router.post('/modifyDevice', helper.CheckLogin, apiController.ModifyDevice);

    router.post('/deleteDevice', helper.CheckLogin, apiController.DeleteDevice);

    router.get('/updateValue/:id_device/:value', helper.CheckLogin, apiController.UpdateValue);

    return router;
}
