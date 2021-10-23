const { Schema, model } = require('mongoose')

const schemaCandidate = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    photo: {
        type: Schema.Types.Buffer,
        required: true
    }
})

module.exports = model('candidates', schemaCandidate)