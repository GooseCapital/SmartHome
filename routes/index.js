var express = require('express');
var router = express.Router();

module.exports = function ()
{
  router.get('/',isLogin ,function (req, res) {
    res.render('index', {user: req.user});
  });
  return router;
}

function isLogin (req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  } else
      res.redirect('/users/login');
}