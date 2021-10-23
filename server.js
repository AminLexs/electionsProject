const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser')
const initDB = require('./common/initializationDB')
const mongoUtils = require('./common/mongoUtils')

const PORT = process.env.PORT
const app = express() // initialization server

app.use(bodyParser.urlencoded({ extended: false }))

app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});

    app.listen(PORT, () => console.log(`Running on port ${PORT}.`))



