var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('../models/user');



router.get('/', (req, res , next) => {
  res.render('login')
})

router.post("/", function(req, res, next){
  var { email, password } = req.body;
  if (!email || !password) {
      return res.redirect("/users");
  }
  User.findOne({ email: email }, (err, user) => {
      console.log(user)
      if (err) return next(err);
      if (!user) {
          return res.redirect("/users");
      }
      if(!user.validatePassword(password)) return res.redirect('/users');
      // create session
      req.session.userId = user._id;
      res.redirect('/users');
  });
 });

module.exports = router;
