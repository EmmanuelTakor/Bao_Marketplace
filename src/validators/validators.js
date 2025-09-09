const Joi = require('joi');

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  fullName: Joi.string().max(255).optional()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const productCreateSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().min(5).required(),
  price: Joi.number().positive().required(),

  images: Joi.any().optional(),

  // forbid ownerId in user input
  ownerId: Joi.forbidden()
});

const productUpdateSchema = Joi.object({
  title: Joi.string().min(3).max(255),
  description: Joi.string().min(5),
  price: Joi.number().positive(),
  images: Joi.any().optional(),
  ownerId: Joi.forbidden()
});


module.exports = {
  registerSchema, loginSchema, productCreateSchema, productUpdateSchema
};


