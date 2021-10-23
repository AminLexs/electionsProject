# Elections web-app
This is server-client 
## HOW TO USE
1) Define .env and variables:
  * HTTPPORT - port to use at http server (default 8080)
  * HTTPSPORT - port to use at https server (default 8443)
  * URI_DB - uri for connecting to mongoDB (default value not specified)
  * COUNTRIES_CODE - string with codes of permitted countries (default 'BY') (Example, 'BY,RU,FR,EN') 
  * CODE_FOR_PRIVATE_IP - code for private ips (default 'BY')
  `Warning: you must specify uri_db value.`
2) If you want the https server to be started, then you need to add a ssl certificate and a key (file names certificate.crt and key.key) to the /sslcert directory
3) Run server.js or use script "npm start"
4) Functionalities:
  * Send a vote to some candidate (GET /elections/candidates)
  * Show the percentage of votes for candidates (PUT /elections/vote)
  `Warning: If the country of the request is not in the allowed ones, the server returns an error`

5) For tests add tests files to directory "test". Files must be with extension "test.js"
   
6) Script for run test "npm test"
