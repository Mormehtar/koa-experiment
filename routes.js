const Router = require('koa-joi-router');
const Joi = Router.Joi;

const routes = Router();

routes.route({
  method: 'post',
  path: '/user',
  validate: {
    body: {
      UserID: Joi.string().max(200).required(),
    },
    type: 'json'
  },
  handler: async (ctx) => {
    return ctx.dao.createUser(ctx.request.body.UserID)
      .then(result => (result ? 201 : 304))
      .then(result => { ctx.status = result; });
  }
});



module.exports = routes;