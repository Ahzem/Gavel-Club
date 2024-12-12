const express = require("express");
const router = express.Router();
const {
  createEvent,
  getAllEvents,
  deleteEventById,
  updateEventById,
} = require("../controllers/eventController");
const { protect } = require("../middleware/auth");
const { uploadEvent } = require("../config/cloudinary");
const { validateSchema } = require("../middleware/validate");
const { eventSchema } = require("../utils/validators");

router.get("/", getAllEvents);
router.post(
  "/",
  protect,
  uploadEvent.single("image"),
  validateSchema(eventSchema),
  createEvent
);
router.put(
  "/:id",
  protect,
  uploadEvent.single("image"),
  validateSchema(eventSchema),
  updateEventById
);
router.delete("/:id", protect, deleteEventById);

module.exports = router;
