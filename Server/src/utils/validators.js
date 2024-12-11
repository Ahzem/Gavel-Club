const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const eventSchema = Joi.object({
  title: Joi.string().required(),
  date: Joi.date().required(),
  time: Joi.string().required(),
  location: Joi.string().required(),
  description: Joi.string().required(),
  type: Joi.string()
    .valid("Educational meeting", "Fun activity", "other")
    .required(),
  registrationUrl: Joi.string().uri().allow(""),
  capacity: Joi.number().integer().min(1).allow(null),
  organizer: Joi.string().required(),
}).unknown(true);

module.exports = {
  loginSchema,
  eventSchema,
};
