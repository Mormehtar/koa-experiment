const Router = require('koa-joi-router');
const Joi = Router.Joi;

const routes = Router();

routes.post(
  '/:UserID',
  {
    validate: {
      params: {
        UserID: Joi.string().max(200).required(),
      }
    }
  },
  async (ctx) => {
    return ctx.dao.createUser(ctx.request.params.UserID)
      .then(result => (result ? 201 : 304))
      .then(result => { ctx.status = result; });
  }
);



module.exports = routes;