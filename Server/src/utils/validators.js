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
}).unknown(true);

const teamMemberSchema = Joi.object({
  name: Joi.string().required(),
  position: Joi.string()
    .valid(
      "President",
      "Secretary",
      "Vice President Education",
      "Vice President Public Relations",
      "Treasurer",
      "Sergeant at arms",
      "Design Lead",
      "Editorial Lead",
      "Media Lead",
      "Publicity Lead",
      "Web Master",
      "Design Committee member",
      "Editorial Committee member",
      "Media Committee member",
      "Web development Committee member",
      "Publicity Committee member"
    )
    .required(),
  year: Joi.string().required(),
  thoughts: Joi.string().allow(""),
}).unknown(true);

module.exports = {
  teamMemberSchema,
  loginSchema,
  eventSchema,
};
