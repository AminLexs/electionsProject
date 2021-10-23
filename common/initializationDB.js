const Candidate = require("../models/elections/candidate");
const Vote = require("../models/elections/vote");
const path = require("path");
const {ObjectId} = require("./mongoUtils");
const defaultCandidates = [{firstName: 'Ivan', lastName: 'Petrov', imagePath: '/ivan.PNG'},
    {firstName: 'Tanya', lastName: 'Melnikova', imagePath: '/tanya.PNG'},
    {firstName: 'Kolya', lastName: 'Sidorov', imagePath: '/kolya.PNG'}]

exports.initDefaultDB = function () {

    Candidate.find({}, function (err, docs) {
        if (err) return console.log(err);
        if (docs.length === 0) {
            defaultCandidates.forEach((elem) => {
                let candidate = new Candidate({
                    _id: new ObjectId(),
                    firstName: elem.firstName,
                    lastName: elem.lastName,
                    photo: elem.imagePath
                })
                candidate.save(function (err) {
                    if (err) return console.log(err);
                })
            })
        }
    })

}