const Joi = require('joi');

const ProductSchema = Joi.object({
  product_name: Joi.string().max(100).required(),
  description: Joi.string().allow(''),
  price: Joi.number().integer().required(),
  stock: Joi.number().integer().required(),
});

module.exports = { ProductSchema };
