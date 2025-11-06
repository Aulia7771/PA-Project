const Joi = require('joi');

const PaymentSchema = Joi.object({
  checkout_id: Joi.number().integer().required(),
  payment_method: Joi.string().max(50).required(),
  payment_status: Joi.string().valid('Pending', 'Success', 'Failed').default('Pending'),
});

module.exports = { PaymentSchema };
