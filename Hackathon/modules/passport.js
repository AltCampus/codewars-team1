const passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var User = require('../models/User');
const keys = require('./keys');


passport.use(new GitHubStrategy({
	// options for google strategy
	callbackURL: '/auth/github/callback',
	clientID: keys.github.clientID,
	clientSecret: keys.github.clientSecret
	}, (accessToken, refreshToken, profile, done) => {
	// passport callback function
	//check for existing author from profile into local database
	// console.log(profile)
	User.findOne({email: profile.emails[0].value}, (err, currentUser) => {
			console.log(profile)
		if(currentUser) {
			if(currentUser.strategies.includes(profile.provider)) {
				console.log(profile.provider, 'provider check')
				return done(null, currentUser)
			} else {
				User.findOneAndUpdate({email: profile.emails[0].value }, {new: true}, (err, currentUser) => {
					if(err) return done(err);
					done(null, currentUser)
				})
			}
		}
		else {
			new User({
				github: {
						name: profile.displayName,
						photo: profile.photos[0].value
					},
				email: profile.emails[0].value,
			}).save().then((newUser) => {
				console.log('new User created:' + newUser)
				done(null, newUser)
			})
		}
		})
	}
	)
);

passport.serializeUser((user, done) => {
  	done(null, user.id);
	});

passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(null, user)
	})
});
