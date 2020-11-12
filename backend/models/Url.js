const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
	urlCode: { type: String, required: true },
	longUrl: { type: String, required: true },
	shortUrl: { type: String, required: true },
	clicks: { type: Number, default: 0, required: true },
	date: { type: String, default: Date.now, required: true },
	active: { type: Boolean, default: true, required: true },
	owner: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	}
});

module.exports = mongoose.model('Url', urlSchema);
