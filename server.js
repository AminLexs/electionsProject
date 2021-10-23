const express = require('express');
const bodyParser = require('body-parser')
const config = require('config')
const path = require("path");


const PORT = config.get('port') || 3000

const app = express() // initialization server


app.use(bodyParser.urlencoded({ extended: false }))

app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});

    app.listen(PORT, () => console.log(`Running on port ${PORT}.`))



