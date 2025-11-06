const Joi = require('joi');

const CheckoutSchema = Joi.object({
  user_id: Joi.number().integer().required(),
  total_amount: Joi.number().integer().required(),
  status: Joi.string().valid('Pending', 'Success', 'Failed').default('Pending'),
});

module.exports = { CheckoutSchema };
