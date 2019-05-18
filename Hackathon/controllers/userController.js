var User = require('../models/user');
var fetch = require('node-fetch');
let checkData;


const fetchAPI =(cb)=>{
	fetch('http://localhost:3000/api/users').then(res => res.json()).then(data => {
			cb(data)
			// data.forEach(newdata => {
					
			// });
	})
} 

module.exports = {
	// Render register page
	register: (req, res , next) => {
  	res.render('register');
	},

	dashboard: (req, res, next) => {
		res.render('dashboard');
		fetchAPI((data) =>{
			res.render('dashboard',{data:data})
		})
	},

	// POST on user registration
	addUser: (req, res, next) => {
		var {email, username, password} = req.body;
		if(!email || !username || !password) {
			res.send('Please submit all the required fields');
		}
		fetch(`https://www.codewars.com/api/v1/users/${req.body.username}`).then(res => res.json()).then(data => {
					checkData = data;
					if (checkData.success === 'false') {
						return res.send("User Doesn't Exist")
					}
					console.log(checkData, '..........this is newdata within FIRST FETCH');
				})
			// 	if (checkData.success === 'false') {
			// 	return res.send("Codewars User doesn't exist");
			// }
		User.findOne({email: req.body.email}, (err, user) => {
	    if(err) return next(err);
	    if(user) {
	      res.send('A user is already registered with this email address. Please try with a different email address.')
	    }
	    User.create({
	        username:req.body.username,
					email:req.body.email,
	        password:req.body.password,
	        codewars: req.body.codewars
	    }, (err, user) => {
	      if(err) return next(err);
	      console.log('registration successful');
	      res.status(201).redirect('/');

	      // saving data in an object for codewars
	      fetch(`https://www.codewars.com/api/v1/users/${req.body.username}`).then(res => res.json()).then(data => {
					let newdata = data;
					console.log(newdata, '..........this is newdata within SECOND FETCH');
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