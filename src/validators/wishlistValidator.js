const Joi = require('joi');

const WishlistSchema = Joi.object({
  user_id: Joi.number().integer().required(),
  product_id: Joi.number().integer().required(),
});

module.exports = { WishlistSchema };
