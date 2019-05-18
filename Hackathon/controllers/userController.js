var User = require('../models/user');

module.exports = {
	// Render register page
	register: (req, res , next) => {
  	res.render('register')
	},

	dashboard: (req, res, next) => {
		res.render('dashboard')
	},

	// POST on user registration
	addUser: (req, res, next) => {
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
	},

	logout: (req, res, next) => {
		// console.log('user logged out')
		req.session.destroy();
		res.redirect('/');
	}
}