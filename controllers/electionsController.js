const { getClientIp } = require('request-ip'); // Determine client IP address from request
const getGeo = require('geoip-country').lookup; // Finds country code by ip
const Candidate = require('../models/elections/candidate');
const Vote = require('../models/elections/vote');
const { getDataModel, ObjectId } = require('../common/mongoUtils');

// Finds country code by ip or request
function requestCountry(req, privateIpCountry) {
	const privateIpReg = /^(?:192\.168\.[0-9]+\.[0-9]+|10\.[0-9]+\.[0-9]+\.[0-9]+|172\.(1[6-9]|2[0-9]|3[0-2])\.[0-9]+\.[0-9]+|127\.0\.0\.1)$/;
	const ip = typeof req === 'string' ? req : getClientIp(req);
	const geo = getGeo(ip);
	if (geo) {
		return geo.country;
	}
	return privateIpCountry ? (privateIpReg.test(ip) || ip === '::1') && privateIpCountry : false;
}

exports.requestCountry = requestCountry;

// Returns to the client an array of candidates with the percentage of votes
exports.getCandidates = async (request, response) => {
	let candidates = await getDataModel(Candidate, {});
	const votes = await getDataModel(Vote, {});
	const stats = votes.reduce((acc, el) => {
		acc[el.candidateId.toString()] = (acc[el.candidateId.toString()] || 0) + 1;
		return acc;
	}, {});
	const IDs = Object.keys(stats);
	for (let i = 0; i < IDs.length; i++) {
		stats[IDs[i]] /= votes.length;
		stats[IDs[i]] *= 100;
	}
	candidates = candidates.map((elem) => {
		const objElem = elem.toObject();
		objElem.percent = (stats[elem._id.toString()] !== undefined) ? stats[elem._id.toString()] : 0;
		return objElem;
	});
	response.render('stats', { candidates });
};

// Saves vote to database
exports.sendVote = (request, response) => {
	const permittedCountries = process.env.COUNTRIES_CODE;
	const codeForPrivateIP = process.env.CODE_FOR_PRIVATE_IP;
	if (permittedCountries.indexOf(requestCountry(request, codeForPrivateIP)) !== -1) {
		const vote = new Vote({
			_id: new ObjectId(),
			passportNumber: request.body.passportNumber,
			candidateId: request.body.candidateId,
		});
		vote.save((err) => {
			if (err) return response.send(err);
			response.status(201).send({ message: 'You have successfully voted' });
		});
	} else {
		response.status(403).send({ message: 'Your country isn\'t permitted' });
	}
};
