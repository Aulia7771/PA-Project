const Joi = require('joi');

const ShoppingCartSchema = Joi.object({
  user_id: Joi.number().integer().required(),
  product_id: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).default(1),
});

module.exports = { ShoppingCartSchema };
