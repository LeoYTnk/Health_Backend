const Joi = require('joi');

const validateRegister = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).max(100).required(),
    age: Joi.number().integer().min(1).max(150).optional()
  });

  return schema.validate(data);
};

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  return schema.validate(data);
};

const validateUpdateProfile = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    age: Joi.number().integer().min(1).max(150).optional()
  });

  return schema.validate(data);
};

module.exports = {
  validateRegister,
  validateLogin,
  validateUpdateProfile
};
