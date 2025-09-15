const Joi = require('joi');

const userHealthSchema = Joi.object({
  user_id: Joi.string().required(),
  weight: Joi.number().positive().max(1000).required(),
  height: Joi.number().positive().max(300).required(),
  age: Joi.number().integer().min(0).max(150).required()
});

const userHealthUpdateSchema = Joi.object({
  weight: Joi.number().positive().max(1000).optional(),
  height: Joi.number().positive().max(300).optional(),
  age: Joi.number().integer().min(0).max(150).optional()
}).min(1);

const userIdSchema = Joi.string().required();

const validateUserHealth = (req, res, next) => {
  const { error } = userHealthSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      details: error.details[0].message,
      error: 'VALIDATION_ERROR'
    });
  }
  next();
};

const validateUserHealthUpdate = (req, res, next) => {
  const { error } = userHealthUpdateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      details: error.details[0].message,
      error: 'VALIDATION_ERROR'
    });
  }
  next();
};

const validateUserId = (req, res, next) => {
  const { error } = userIdSchema.validate(req.params.userId);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Invalid user ID',
      details: error.details[0].message,
      error: 'VALIDATION_ERROR'
    });
  }
  next();
};

module.exports = {
  validateUserHealth,
  validateUserHealthUpdate,
  validateUserId
};