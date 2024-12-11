const express = require("express");
const router = express.Router();
const { createEvent, getAllEvents, deleteEventById } = require("../controllers/eventController");
const { protect } = require("../middleware/auth");
const { upload } = require("../config/cloudinary");
const { validate } = require("../middleware/validate");
const { eventSchema } = require("../utils/validators");
const Event = require("../models/Event");

router.get("/", getAllEvents);

router.post(
  "/",
  protect,
  upload.single("image"),
  validate(eventSchema),
  createEvent
);

router.delete("/:id", protect, deleteEventById);

module.exports = router;
