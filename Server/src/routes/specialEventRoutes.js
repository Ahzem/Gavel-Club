const express = require("express");
const router = express.Router();
const { uploadSpecialEvent } = require("../config/cloudinary");
const { protect } = require("../middleware/auth");
const {
  getSpecialEvent,
  createSpecialEvent,
  updateSpecialEvent,
} = require("../controllers/specialEventController");

// Get special event - public
router.get("/", getSpecialEvent);

router.post(
  "/",
  protect,
  uploadSpecialEvent.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ]),
  createSpecialEvent
);

router.put(
  "/:id",
  protect,
  uploadSpecialEvent.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ]),
  updateSpecialEvent
);

module.exports = router;
