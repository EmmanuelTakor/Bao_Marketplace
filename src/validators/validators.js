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
  title: Joi.string().max(255).required(),
  description: Joi.string().allow('', null),
  price: Joi.number().min(0).required(),
  images: Joi.array().items(Joi.string().uri()).optional()
});

const productUpdateSchema = Joi.object({
  title: Joi.string().max(255).optional(),
  description: Joi.string().allow('', null),
  price: Joi.number().min(0).optional(),
  images: Joi.array().items(Joi.string().uri()).optional()
}).min(1);

module.exports = {
  registerSchema, loginSchema, productCreateSchema, productUpdateSchema
};