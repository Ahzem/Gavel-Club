const express = require("express");
const router = express.Router();
const { validateAdmin } = require("../middleware/auth");
const { uploadBlogCover, uploadAuthorImage } = require("../config/cloudinary");
const blogController = require("../controllers/blogController");

router.get("/", blogController.getAllBlogs);

router.post(
  "/",
  validateAdmin,
  uploadAuthorImage.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "authorImage", maxCount: 1 },
  ]),
  blogController.createBlog
);

router.put(
  "/:id",
  validateAdmin,
  uploadBlogCover.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "authorImage", maxCount: 1 },
  ]),
  blogController.updateBlog
);

router.get("/published", blogController.getPublishedBlogs);
router.put("/:id/status", validateAdmin, blogController.updateBlogStatus);
router.delete("/:id", validateAdmin, blogController.deleteBlog);
router.get("/:slug", blogController.getBlogBySlug);
router.put("/:id/clap", blogController.updateClaps);

module.exports = router;
