const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');
const isValidUser = require('../middleware');

const Url = require('../models/Url');
const User = require('../models/User');
// const DeactivatedUrl = require('../models/DeactivatedUrl');

router.get('/', isValidUser, async (req, res) => {
	// const { active } = req.query;
	const { user } = res.locals;
	try {
		const urls = await Url.find({ owner: { id: user._id } });

		res.status(200).json(urls);
	} catch (err) {
		res.status(500).json('Server error');
	}
});

router.post('/', isValidUser, async (req, res) => {
	const { longUrl } = req.body;
	const { user } = res.locals;
	const baseUrl = config.get('baseUrl');

	if (!validUrl.isUri(baseUrl)) {
		return res.status(400).json('Invalid base url');
	}

	const urlCode = shortid.generate();

	if (validUrl.isUri(longUrl)) {
		try {
			let url = await Url.findOne({ longUrl, owner: { id: user._id } });

			if (url) {
				res.json(url);
			} else {
				const shortUrl = baseUrl + '/' + urlCode;

				url = new Url({
					longUrl,
					shortUrl,
					urlCode,
					date: new Date(),
					owner: {
						id: user._id
					}
				});

				await url.save();

				res.json(url);
			}
		} catch (err) {
			console.error(err);
			res.status(500).json('Server error');
		}
	} else {
		res.status(400).json('invalid long url');
	}
});

router.put('/', isValidUser, async (req, res) => {
	const { id, active } = req.body;
	const { user } = res.locals;

	await Url.findOne({ _id: id, owner: { id: user._id } }, (err, foundUrl) => {
		if (err) {
			return res.status(400).json('an error occured while finding the url');
		}
		if (foundUrl) {
			foundUrl.active = active;
			foundUrl.save();
		}
	});
	const urls = await Url.find({ owner: { id: user._id } });
	res.json(urls);
});

router.delete('/', isValidUser, async (req, res) => {
	const { id } = req.body;
	const { user } = res.locals;

	await Url.findOne({ _id: id, owner: { id: user._id } }, (err, foundUrl) => {
		if (err) {
			res.status(400).json('an error occured while finding the url');
		}
		if (foundUrl) {
			foundUrl.remove();
		}
	});
	const trashedUrls = await Url.find({ owner: { id: user._id } });

	res.json(trashedUrls);
});

module.exports = router;
