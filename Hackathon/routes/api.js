var express = require('express');
var router = express.Router();
var apiController = require('../controller/apiController');

router.get('/users', apiController.All_Users);

module.exports = router;
