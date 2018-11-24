var express = require('express');
var router = express.Router();
var helper = require('../helper')

module.exports = function ()
{
  router.get('/', helper.CheckLogin ,function (req, res) {
    res.render('dashboard', {user: req.user});
  });
  return router;
}