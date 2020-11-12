const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const chalk = require('chalk');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');
const isValidUser = require('./middleware');

const User = require('./models/User');

const app = express();

passport.serializeUser((user, cb) => {
	cb(null, user);
});

passport.deserializeUser((user, cb) => {
	cb(null, user);
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.GOOGLE.clientID,
			clientSecret: keys.GOOGLE.clientSecret,
			callbackURL: '/auth/google/callback'
		},
		async (accessToken, _refreshToken, profile, cb) => {
			let user = await User.findOne({ googleID: profile.id });
			if (user) {
				console.log('existing user');
				user.token = accessToken;
				user.save();
			} else {
				user = new User({
					email: profile.emails[0].value,
					googleID: profile.id,
					name: profile.displayName,
					token: accessToken
				});
				user.save();
			}
			return cb(null, user);
		}
	)
);

connectDB();

app.use(passport.initialize());

app.use(cors());

app.use(express.json({ extended: false }));

app.use('/', require('./routes/index'));
app.use('/api/urls', require('./routes/url'));

app.post('/auth', isValidUser, (req, res) => {
	const { user } = res.locals;
	res.json(user);
});

app.post('/auth/logout', isValidUser, (req, res) => {
	const { user } = res.locals;
	user.token = '';
	user.save();
	res.status(200).json('user logged out');
});

app.get(
	'/auth/google',
	passport.authenticate('google', {
		scope: ['profile', 'email']
	})
);

app.get(
	'/auth/google/callback',
	passport.authenticate('google'),
	(req, res) => {
		const token = req.user.token;
		res.redirect(`http://localhost:3000/authenticated/${token}`);
	}
);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
