const Joi = require('joi');

const CheckoutItemsSchema = Joi.object({
  checkout_id: Joi.number().integer().required(),
  product_id: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required(),
  price: Joi.number().integer().required(),
});

module.exports = { CheckoutItemsSchema };
