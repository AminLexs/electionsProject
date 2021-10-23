const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser')
const initDB = require('./common/initializationDB')
const mongoUtils = require('./common/mongoUtils')
const electionsRouter = require('./routers/electionsRouter')
const homeRouter = require('./routers/homeRouter')

const PORT = process.env.PORT
const app = express() // initialization server

app.use(bodyParser.urlencoded({ extended: false }))
app.use('/elections', electionsRouter)
app.use('/', homeRouter)
app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});
mongoUtils.connectToDB( (err) => {
    if (err) console.log(err);
    initDB.initDefaultDB()
    app.listen(PORT, () => console.log(`Running on port ${PORT}.`))
})



