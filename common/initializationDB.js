const Candidate = require("../models/elections/candidate");
const {ObjectId} = require("./mongoUtils");

//initial data for DB
const defaultCandidates = [{firstName: 'Ivan', lastName: 'Petrov', imagePath: '/ivan.PNG'},
    {firstName: 'Tanya', lastName: 'Melnikova', imagePath: '/tanya.PNG'},
    {firstName: 'Kolya', lastName: 'Sidorov', imagePath: '/kolya.PNG'}]

//adds data if the database has not been initialized
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