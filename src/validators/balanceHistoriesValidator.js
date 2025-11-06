const Joi = require('joi');

const BalanceHistoriesSchema = Joi.object({
  user_id: Joi.number().integer().required(),
  amount: Joi.number().integer().required(),
  transaction_type: Joi.string().valid('Topup', 'Withdraw', 'Purchase', 'Refund').required(),
  description: Joi.string().allow(''),
});

module.exports = { BalanceHistoriesSchema };
