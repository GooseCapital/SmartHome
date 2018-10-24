var express = require('express');
var router = express.Router();
var userController = require('../controllers/usercontroller');

module.exports = function (passport) {

  router.get('/', function (req, res) {
    res.redirect('/users/login');
  });

  router.get('/login', isLogin, function (req, res) {
    res.render('login', {
      failureFlash: 'null'
    });
  });

  router.post('/login1', userController.checklogin);

  router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/users/login');
  });

  router.post('/login', isLogin, passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/users/login",
  }));

  // users/auth/facebook
  router.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
  }));

  // users/auth/facebook/callback
  router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/'
    }));

  router.post('/register', isLogin, userController.register);

  router.get('/register', isLogin, (req, res) => {
    res.render('register', {
      failureFlash: 'null'
    });
  })
  return router;
}

function isLogin(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  } else
    res.redirect('/');
}