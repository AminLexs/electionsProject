const mongoose = require('mongoose')
const url = process.env.URL_DB
module.exports = {
    connectToDB: function (callback) {
        mongoose.connect(url, {useNewUrlParser: true}, function (err) {
            return callback(err);
        })
    },
    disconnect: function () {
        mongoose.disconnect();
    },
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