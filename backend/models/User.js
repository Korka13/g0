const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	email: String,
	googleID: String,
	name: String,
	token: String
});

module.exports = mongoose.model('User', userSchema);
