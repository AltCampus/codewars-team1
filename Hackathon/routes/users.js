var express = require('express');
var router = express.Router();
var User = require('../models/user');
var newdata;
const fetch = require('node-fetch');


router.get('/', (req, res , next) => {
  res.render('dashboard')
})

router.get('/register', (req, res , next) => {
  res.render('register')
})

router.get('/github', (req, res , next) => {
  res.render('dashboard')
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
        password:req.body.password,
        codewars: req.body.codewars
    }, (err, user) => {
      if(err) return next(err);
      console.log('registration successful')
      res.status(400).redirect('/');

      // saving data in an object for codewars
      fetch(`https://www.codewars.com/api/v1/users/${req.body.username}`).then(res => res.json()).then(data => {
        newdata = data;
        console.log(newdata)
        user.codewars = data;
        user.save();
      })
    }) 
    })
})

module.exports = router;