const koa = require('koa');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const forceSSL = require('koa-force-ssl');

const config = require('./config/config.json');

const app = new koa();

const httpPort = 3000;
const httpsPort = 3001;

// Force SSL on all page
app.use(forceSSL(httpsPort));

// index page
app.use((ctx) => {
  ctx.body = "hello world from " + ctx.request.url;
});

// SSL options
const options = {
  key: fs.readFileSync(path.join(__dirname, config.certificates.key)),
  cert: fs.readFileSync(path.join(__dirname, config.certificates.cert))
};

// start the server
http.createServer(app.callback()).listen(httpPort);
https.createServer(options, app.callback()).listen(httpsPort);
