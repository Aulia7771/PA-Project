const Joi = require('joi');

const BalanceSchema = Joi.object({
  user_id: Joi.number().integer().required(),
  balance_amount: Joi.number().integer().min(0).default(0),
});

module.exports = { BalanceSchema };
