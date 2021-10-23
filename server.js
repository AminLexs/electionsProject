const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const https = require('https');
const http = require('http');
const bodyParser = require('body-parser')
const initDB = require('./common/initializationDB')
const mongoUtils = require('./common/mongoUtils')
const electionsRouter = require('./routers/electionsRouter')
const homeRouter = require('./routers/homeRouter')
const exphbs = require('express-handlebars')
const fs = require("fs");
const path = require("path");

const key = fs.readFileSync('./sslcert/key.key');
const cert = fs.readFileSync('./sslcert/certificate.crt');

const app = express() // initialization server
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})
app.engine('hbs',hbs.engine)
app.set('view engine', 'hbs')
app.set('views','views')
app.use(express.static(path.join((__dirname,'media'))));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/elections', electionsRouter)
app.use('/', homeRouter)
app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});

const httpServer = http.createServer(app);
const httpsServer  = https.createServer({key: key, cert: cert }, app);
const httpsPort = process.env.HTTPSPORT
const httpPort = process.env.HTTPPORT
mongoUtils.connectToDB( (err) => {
    if (err) console.log(err);
    initDB.initDefaultDB()
    //app.listen(PORT, () => console.log(`Running on port ${PORT}.`))
    httpServer.listen(httpPort,() => { console.log(`Http server is listening on ${httpPort}`) });
    httpsServer.listen(httpsPort, () => { console.log(`Https server is listening on ${httpsPort}`) });
})



