const express = require("express");
const router = express.Router();
const { upload } = require("../config/cloudinary");
const { protect } = require("../middleware/auth");
const galleryController = require("../controllers/galleryController");

router.get("/", galleryController.getAllImages);
router.post(
  "/",
  protect,
  upload.single("image"),
  galleryController.createImage
);
router.put("/:id", protect, galleryController.updateImage);
router.delete("/:id", protect, galleryController.deleteImage);

module.exports = router;
