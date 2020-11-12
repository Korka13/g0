const User = require('../models/User');

const isValidUser = async (req, res, next) => {
	const { authentication } = req.headers;
	if (authentication && authentication.split(' ')[0] === 'Bearer') {
		try {
			const user = await User.findOne({ token: authentication.split(' ')[1] });
			if (user) {
				res.locals.user = user;
				next();
			} else {
				res.redirect(401, 'http://localhost:3000/login');
			}
		} catch (err) {
			console.error(err);
			res.status(500).json('Server error');
		}
	} else {
		res.redirect(401, 'http://localhost:3000/login');
	}
};

module.exports = isValidUser;
