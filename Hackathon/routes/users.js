var express = require('express');
var router = express.Router();
var User = require('../models/user');


router.get('/', (req, res , next) => {
  res.render('dashboard')
})

router.get('/register', (req, res , next) => {
  res.render('register')
})

router.get('/github', (req, res , next) => {
  res.send('logged in with github')
})

router.post('/register', (req, res, next) => {
  console.log(req.body, "body ...................")
  User.findOne({email: req.body.email}, (err, user) => {
    if(err) return next(err)
    if(user) {
      console.log("user exist...")
    }
    User.create({
        username:req.body.username,
				email:req.body.email,
				password:req.body.password
    }, (err, user) => {
      if(err) return next(err);
      console.log('registration successful')
      res.status(400).redirect('/');
    }) 
    })
})

module.exports = router;