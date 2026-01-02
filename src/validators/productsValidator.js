const Joi = require('joi');

module.exports = {
  
  create: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow(""),
    price: Joi.number().required(),
    stock: Joi.number().integer().min(0).required(),
  }),

  update: Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    price: Joi.number().optional(),
    stock: Joi.number().integer().min(0).optional(),
  }).min(1),

};
