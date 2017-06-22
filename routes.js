const Router = require('koa-joi-router');
const Joi = Router.Joi;

const routes = Router();

routes.post(
  '/',
  {
    validate: {
      type: 'json',
      body: {
        UserID: Joi.string().max(200).required(),
      }
    }
  },
  ctx => {
    return ctx.dao.createUser(ctx.request.body.UserID)
      .then(result => (result ? 201 : 409))
      .then(result => { ctx.status = result; });
  }
);

routes.post(
  '/:UserID',
  {
    validate: {
      type: 'json',
      params: {
        UserID: Joi.string().max(200).required(),
      },
      body: {
        UserProfile: Joi.string().required()
      }
    }
  },
  ctx => ctx.dao.updateUser(ctx.request.params.UserID, ctx.request.body.UserProfile)
    .then(result => (result ? 200 : 404))
    .then(result => { ctx.status = result; })
);

routes.get(
  '/:UserID',
  {
    validate: {
      params: {
        UserID: Joi.string().max(200).required(),
      }
    }
  },
  ctx => ctx.dao.getUserProfile(ctx.request.params.UserID)
    .then(userProfile => {
      if (!userProfile) {
        ctx.status = 404;
        return;
      }
      ctx.status = 200;
      ctx.body = userProfile.UserProfile;
    })
);

module.exports = routes;