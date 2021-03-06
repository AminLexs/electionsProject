const dotenv = require('dotenv');

dotenv.config(); // Get configuration from .env

const fs = require('fs');
const path = require('path');

const https = require('https');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const localization = require('./localization/localize');

const initDB = require('./common/initializationDB');
const mongoUtils = require('./common/mongoUtils');
const electionsRouter = require('./routers/electionsRouter');
const homeRouter = require('./routers/homeRouter');

const app = express(); // Initialization server

const hbs = exphbs.create({ // Create handlebar
	defaultLayout: 'main',
	extname: 'hbs',
	helpers: {
		locale: localization,
	},
});

app.engine('hbs', hbs.engine); // Set engine handlebars
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join((__dirname, 'media'))));// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/elections', electionsRouter);// set routers
app.use('/', homeRouter);
app.use((req, res) => {
	res.status(404).send('Not Found');
});

const httpServer = http.createServer(app);
let httpsServer;
try{
	const key = fs.readFileSync('./sslcert/key.key');
	const cert = fs.readFileSync('./sslcert/certificate.crt');
	httpsServer = https.createServer({ key, cert }, app);
}catch (error){
	console.log(error)
}

const httpsPort = process.env.HTTPSPORT || 8080;
const httpPort = process.env.HTTPPORT || 8443;

mongoUtils.connectToDB((err) => {
	if (err) console.log(err);
	initDB.initDefaultDB(); // Initialization DB
	httpServer.listen(httpPort, () => { console.log(`Http server is listening on ${httpPort}`); });
	if (httpsServer!==undefined)
		httpsServer.listen(httpsPort, () => { console.log(`Https server is listening on ${httpsPort}`); });
});
