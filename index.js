const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const config = require('./config/config.json');

const app = require('./app')(config);

// SSL options
const options = {
  key: fs.readFileSync(path.join(__dirname, config.certificates.key)),
  cert: fs.readFileSync(path.join(__dirname, config.certificates.cert))
};

// start the server
http.createServer(app.callback())
  .listen(config.httpPort, () => console.log(`Listen ${config.httpPort} port for HTTP`));
https.createServer(options, app.callback())
  .listen(config.httpsPort, () => console.log(`Listen ${config.httpsPort} port for HTTPS`));
