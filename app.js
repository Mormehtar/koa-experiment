const koa = require('koa');
const forceSSL = require('koa-force-ssl');
const pgp = require('pg-promise');
const routes = require('./routes');

const DAO = require('./dao');

module.exports = config => {
  const app = new koa();
  app.context.dao = new DAO(pgp(config.db));
  app.context.config = config;

  // Force SSL on all page
  app.use(forceSSL(config.httpsPort));

  // routes
  app.use(routes.middleware());

  return app;
};