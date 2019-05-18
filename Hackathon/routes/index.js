var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('../models/user');
var indexController = require('../controllers/indexController');


router.get('/', indexController.showLogin)

router.post("/", indexController.userLogin);

module.exports = router;
