require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("../models/Admin");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);

    await Admin.create({
      email: "admin@gavel.com",
      password: "Gavel#WebAdmin@2024",
      role: "superadmin",
    });

    console.log("Admin user created successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();
