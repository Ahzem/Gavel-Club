const Admin = require("../models/Admin");
const { generateToken } = require("../utils/jwt");

const loginAdmin = async (email, password) => {
  const admin = await Admin.findOne({ email });

  if (!admin) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await admin.comparePassword(password);

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  // Update last login
  admin.lastLogin = new Date();
  await admin.save();

  const token = generateToken(admin._id);

  return { token, admin };
};

module.exports = {
  loginAdmin,
};
