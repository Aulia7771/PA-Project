const Joi = require("joi");

const shoppingCartValidator = {
  payload: Joi.object({
    user_id: Joi.number().integer().required(),
    product_id: Joi.number().integer().required(),
    quantity: Joi.number().integer().min(1).required(),
  })
};

module.exports = { shoppingCartValidator };
