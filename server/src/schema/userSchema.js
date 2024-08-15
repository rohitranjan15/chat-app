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

const friendRequest = Joi.object({
  id: Joi.number().required(),
  request_id: Joi.number().required(),
  status: Joi.number().valid(1,2).required(),
});

module.exports = { login, signup, sendRequest, friendRequest };
