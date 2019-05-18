var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('../models/user');


router.get('/', (req, res , next) => {
  res.render('login')
})

router.post("/", (req, res, next) => {
	var {email, password} = req.body;
	User.findOne({email: email}, (err, user) => {
		// console.log(err, user);
		if(err) return  res.status(500).redirect('/');
		if(!user) return res.status(400).send('User NOT found. Please try again!');
		user.comparePassword(password, (err, isMatch) => {
			// console.log(err, isMatch)
			if(err) return res.status(500).next(err);
			if(!isMatch) return res.status(400).send('Incorrect Password. Please try again!');
			// console.log('login success');
      req.session.userId = user._id;
      console.log('user authenticated successfully');
			res.redirect('/users');
		});
	});
});

module.exports = router;
