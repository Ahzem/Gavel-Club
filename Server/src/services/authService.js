const Admin = require("../models/Admin");
const { generateToken } = require("../utils/jwt");

const loginAdmin = async (email, password) => {
  const admin = await Admin.findOne({ email });
  if (!admin || !await admin.comparePassword(password)) {
    throw new Error("Invalid credentials");
  }

  admin.lastLogin = new Date();
  await admin.save();

  const token = generateToken(admin._id, true);
  return { token, admin };
};
module.exports = {
  loginAdmin,
};
