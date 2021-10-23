const getClientIp = require('request-ip').getClientIp;
const getGeo = require('geoip-country').lookup;
const Candidate = require("../models/elections/candidate");
const Vote = require("../models/elections/vote");

exports.getCandidates = async function (request, response) {

    response.send('candidates')
};
exports.sendVote = function (request, response) {
    response.send('vote sent')

};