var express = require('express');
var router = express.Router();
var helper = require('../helper');

module.exports = function () {
  router.get('/', helper.CheckLogin, function (req, res) {
    res.render('../views/device/viewDevice', {
      mainSlidebar: 'device',
        childSlidebar: 'viewDevice',
        user: req.user
    });
  });

  router.get('/addDevice', helper.CheckLogin, function (req, res) {
    res.render('../views/device/addDevice', {
      mainSlidebar: 'device',
      childSlidebar: 'addDevice',
      user: req.user
    });
  });
  return router;
}