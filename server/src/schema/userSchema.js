const Joi = require("joi");

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const signup = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const sendRequest = Joi.object({
  id: Joi.number().required(),
  user_id: Joi.number().required(),
});

module.exports = { login, signup, sendRequest };
