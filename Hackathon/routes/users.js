var express = require('express');
var router = express.Router();
var User = require('../models/user');
// var newdata;
// const fetch = require('node-fetch');
var userController = require('../controllers/userController');
var authController = require('../controllers/authController');


router.get('/dashboard', authController.isUserLogged, userController.dashboard)

router.get('/register', userController.register)

router.get('/github', userController.dashboard)

router.post('/register', userController.addUser)

router.get('/logout', userController.logout)

module.exports = router;