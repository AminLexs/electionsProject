const mongoose = require('mongoose')
const url = process.env.URL_DB
module.exports = {
    //connecting to DB
    connectToDB: function (callback) {
        mongoose.connect(url, {useNewUrlParser: true}, function (err) {
            return callback(err);
        })
    },
    //disconnecting from DB
    disconnect: function () {
        mongoose.disconnect();
    },
    //gets data from collection by model and filter
    getDataModel: async function (model, filter) {
        return model.find(filter)
            .then(data => {
                return data;
            })
            .catch(err => {
                console.log(err);
                return;
            });
    },
    ObjectId: mongoose.Types.ObjectId
};