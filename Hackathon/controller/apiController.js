var User = require('../models/user');

module.exports = {
	All_Users: function (req, res, next) {
		User.find({}, (err, users) => {
			if (err) return next(err);
            res.json(users);
		})
    }
}