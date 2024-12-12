const {
  teamMemberSchema,
  loginSchema,
  eventSchema,
} = require("../utils/validators");

const validateSchema = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

module.exports = {
  validateSchema,
  validateLogin: validateSchema(loginSchema),
  validateEvent: validateSchema(eventSchema),
  validateTeamMember: validateSchema(teamMemberSchema),
};
