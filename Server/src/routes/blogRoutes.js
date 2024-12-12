const express = require("express");
const router = express.Router();
const { validateAdmin } = require("../middleware/auth");
const { uploadBlogCover, uploadAuthorImage } = require("../config/cloudinary");
const blogController = require("../controllers/blogController");

// Get all blogs
router.get("/", blogController.getAllBlogs);

// Create new blog
router.post(
  "/",
  validateAdmin,
  uploadAuthorImage.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "authorImage", maxCount: 1 },
  ]),
  blogController.createBlog
);

// Update blog
router.put(
  "/:id",
  validateAdmin,
  uploadBlogCover.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "authorImage", maxCount: 1 },
  ]),
  blogController.updateBlog
);

router.put("/:id/status", validateAdmin, blogController.updateBlogStatus);

router.delete("/:id", validateAdmin, blogController.deleteBlog);

module.exports = router;
