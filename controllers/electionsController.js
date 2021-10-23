const getClientIp = require('request-ip').getClientIp;  //Determine client IP address from request
const getGeo = require('geoip-country').lookup; //Finds country code by ip
const Candidate = require("../models/elections/candidate");
const Vote = require("../models/elections/vote");
const {getDataModel, ObjectId} = require("../common/mongoUtils");

//finds country code by ip or request
function requestCountry(req, privateIpCountry) {
    let privateIpReg = /^(?:192\.168\.[0-9]+\.[0-9]+|10\.[0-9]+\.[0-9]+\.[0-9]+|172\.(1[6-9]|2[0-9]|3[0-2])\.[0-9]+\.[0-9]+|127\.0\.0\.1)$/;
    let ip = typeof req === 'string' ? req : getClientIp(req), geo = getGeo(ip);
    return geo ? geo.country : (privateIpCountry ? privateIpReg.test(ip) && privateIpCountry : false);
}
exports.requestCountry = requestCountry

//Returns to the client an array of candidates with the percentage of votes
exports.getCandidates = async function (request, response) {
    let candidates = await getDataModel(Candidate, {})
    let votes = await getDataModel(Vote, {})
    let stats = votes.reduce(function (acc, el) {
        acc[el.candidateId.toString()] = (acc[el.candidateId.toString()] || 0) + 1;
        return acc;
    }, {});
    for (let id in stats) {
        stats[id] /= votes.length
        stats[id] *= 100
    }
    candidates = candidates.map(elem => {
        let objElem = elem.toObject()
        objElem.percent = (stats[elem._id.toString()] !== undefined) ? stats[elem._id.toString()] : 0
        return objElem
    })
    response.render('stats', {candidates})
};

//Saves vote to database
exports.sendVote = function (request, response) {
    //  if(requestCountry(request)===config.get('permittedCountryCode')){
    let vote = new Vote({
        _id: new ObjectId(),
        passportNumber: request.body.passportNumber,
        candidateId: request.body.candidateId
    });
    vote.save(function (err) {
        if (err) return response.send(err);
        response.status(201).send({})
        //response.redirect(303,'candidates');
    })
    //}else{
    //  response.status(403).send({message:'Your country isn\'t permitted'});
    //}
};