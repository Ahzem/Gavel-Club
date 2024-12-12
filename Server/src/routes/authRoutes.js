const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");
const { loginSchema } = require("../utils/validators");
const { validateSchema } = require("../middleware/validate");

router.post("/login", validateSchema(loginSchema), login);

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

module.exports = router;