const Joi = require('joi');

const validateHealthRecord = (data) => {
  const schema = Joi.object({
    weight: Joi.number().positive().precision(2).optional(),
    height: Joi.number().positive().precision(2).optional(),
    notes: Joi.string().max(500).optional().allow('')
  }).or('weight', 'height'); // At least one of weight or height must be provided

  return schema.validate(data);
};

const validateDateRange = (data) => {
  const schema = Joi.object({
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().min(Joi.ref('startDate')).required()
  });

  return schema.validate(data);
};

module.exports = {
  validateHealthRecord,
  validateDateRange
};
