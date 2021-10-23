const { Schema, model } = require('mongoose')

const schemaCandidate = new Schema({
    passportNumber: {
        type: String,
        unique : true,
        required: true
    },
    candidateId: {
        type: String,
        required: true
    }
})

module.exports = model('votes', schemaCandidate)