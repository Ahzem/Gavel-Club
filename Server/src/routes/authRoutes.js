const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");
const { loginSchema } = require("../utils/validators");
const { validate } = require("../middleware/validate");

router.post("/login", validate(loginSchema), login);

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

// Add a test route
router.get("/test", (req, res) => {
  res.json({ message: "Auth route working" });
});

module.exports = router;
