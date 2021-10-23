const getClientIp = require('request-ip').getClientIp;
const getGeo = require('geoip-country').lookup;
const Candidate = require("../models/elections/candidate");
const Vote = require("../models/elections/vote");
const {getDataModel,ObjectId} = require("../common/mongoUtils");

function requestCountry(req, privateIpCountry) {
    let privateIpReg = /^(?:192\.168\.[0-9]+\.[0-9]+|10\.[0-9]+\.[0-9]+\.[0-9]+|172\.(1[6-9]|2[0-9]|3[0-2])\.[0-9]+\.[0-9]+|127\.0\.0\.1)$/;
    let ip = typeof req === 'string' ? req : getClientIp(req), geo = getGeo(ip);
    return geo ? geo.country : (privateIpCountry ? privateIpReg.test(ip) && privateIpCountry : false);
}

exports.getCandidates = async function (request, response) {
    let candidates = await getDataModel(Candidate, {})
    let votes = await getDataModel(Vote, {})
    let stats = votes.reduce(function(acc, el) {
        acc[el.candidateId.toString()] = (acc[el.candidateId.toString()] || 0) + 1;
        return acc;
    }, {});
    for (let id in stats) {
        stats[id]/=votes.length
        stats[id]*=100
    }
    candidates = candidates.map(elem=>{
        let objElem = elem.toObject()
        //console.log(elem._id.toString())
        objElem.percent = (stats[elem._id.toString()]!==undefined)?stats[elem._id.toString()]:0
        return objElem
    })
    response.render('stats',{candidates})
};
exports.sendVote = function (request, response) {
    //  if(requestCountry(request)===config.get('permittedCountryCode')){
    let vote = new Vote({_id:  new ObjectId(),
        passportNumber: request.body.passportNumber,
        candidateId:request.body.candidateId});
    vote.save(function (err) {
        if (err) return response.send(err);
        response.status(201).send({})
        //response.redirect(303,'candidates');
    })
    //}else{
    //  response.status(403).send({message:'Your country isn\'t permitted'});
    //}
};