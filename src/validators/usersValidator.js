const Joi = require('joi');

const UserSchema = Joi.object({
  username: Joi.string().max(50).required(),
  email: Joi.string().email().required(),
  password_hash: Joi.string().min(6).required(),
  full_name: Joi.string().allow(''),
  address: Joi.string().allow(''),
  country_code: Joi.number().integer().allow(null),
  phone_number: Joi.number().integer().allow(null),
});

module.exports = { UserSchema };
