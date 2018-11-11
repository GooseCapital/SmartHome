var express = require('express');
var router = express.Router();
var apiController = require('../controllers/apiController');

module.exports = function () {
  router.get('/', isLogin, function (req, res) {
    let callback;
    apiController.viewDevice(callback)
    console.log(callback);
    res.render('../views/device/viewDevice', async() =>{
      return {
        mainSlidebar: 'device',
        childSlidebar: 'viewDevice',
        user: req.user,
        data: await apiController.viewDevice
      }
    });
  });

  router.get('/addDevice', isLogin, function (req, res) {
    res.render('../views/device/addDevice', {
      mainSlidebar: 'device',
      childSlidebar: 'addDevice',
      user: req.user
    });
  });
  return router;
}

function isLogin(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else
    res.redirect('/users/login');
}