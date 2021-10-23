const Candidate = require('../models/elections/candidate');
const { ObjectId } = require('./mongoUtils');

// Initial data for DB. Image path is path in directory /media. Should use the URL to the picture.
const defaultCandidates = [{ firstName: 'Ivan', lastName: 'Petrov', imagePath: '/ivan.PNG' },
	{ firstName: 'Tanya', lastName: 'Melnikova', imagePath: '/tanya.PNG' },
	{ firstName: 'Kolya', lastName: 'Sidorov', imagePath: '/kolya.PNG' }];

// Adds data if the database has not been initialized
exports.initDefaultDB = () => {
	Candidate.find({}, (err, docs) => {
		if (err) return console.log(err);
		if (docs.length === 0) {
			defaultCandidates.forEach((elem) => {
				const candidate = new Candidate({
					_id: new ObjectId(),
					firstName: elem.firstName,
					lastName: elem.lastName,
					photo: elem.imagePath,
				});
				candidate.save((error) => {
					if (error) return console.log(err);
				});
			});
		}
	});
};
