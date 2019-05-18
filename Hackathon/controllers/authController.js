var User = require('../models/user');

module.exports = {
		isUserLogged: (req, res, next) => {
		if(req.session && req.session.userId) {
			User.findById(req.session.userId, (err, user) => {
				if(err) console.log(err)
				req.user = user;
				res.locals.user = user;
				next();
			})
		}
		else {
			res.redirect('/');
		}
	},

	sessions: (req, res, next) => {
		if(req.session && req.session.userId){
			User.findById(req.session.userId, (err, user) => {
				req.user = user;
				res.locals.user = user;
				next();
			});
		}
		else{
			req.user = null;
			res.locals.user = null;
			next();
		}
	},

}