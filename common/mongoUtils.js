const mongoose = require('mongoose');

const url = process.env.URL_DB;
module.exports = {
	// Connecting to DB
	connectToDB(callback) {
		mongoose.connect(url, { useNewUrlParser: true }, (err) => callback(err));
	},
	// Disconnecting from DB
	disconnect() {
		mongoose.disconnect();
	},
	// Gets data from collection by model and filter
	async getDataModel(model, filter) {
		return model.find(filter)
			.then((data) => data)
			.catch((err) => {
				console.log(err);
				return new Error(err.message);
			});
	},
	ObjectId: mongoose.Types.ObjectId,
};
