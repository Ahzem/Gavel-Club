const Blog = require("../models/Blog");
const slugify = require("../utils/slugify");
const cloudinary = require("../config/cloudinary").cloudinary;

const blogController = {
  // Get all blogs
  getAllBlogs: async (req, res) => {
    try {
      const { status, search } = req.query;
      let query = {};

      if (status && status !== "all") {
        query.status = status;
      }

      if (search) {
        query.$or = [
          { title: { $regex: search, $options: "i" } },
          { subtitle: { $regex: search, $options: "i" } },
        ];
      }

      const blogs = await Blog.find(query).sort({ createdAt: -1 });
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create blog
  createBlog: async (req, res) => {
    try {
      const blogData = req.body;

      // Generate unique slug
      let slug = slugify(blogData.title);
      let slugExists = await Blog.findOne({ slug });
      let counter = 1;

      while (slugExists) {
        slug = `${slugify(blogData.title)}-${counter}`;
        slugExists = await Blog.findOne({ slug });
        counter++;
      }

      // Handle cover image
      if (req.files && req.files.coverImage) {
        blogData.coverImage = req.files.coverImage[0].path;
        blogData.coverImagePublicId = req.files.coverImage[0].filename;
      }

      // Handle author image
      if (req.files && req.files.authorImage) {
        blogData.author = {
          ...JSON.parse(blogData.author),
          imageUrl: req.files.authorImage[0].path,
          imagePublicId: req.files.authorImage[0].filename,
        };
      }

      const blog = new Blog({
        ...blogData,
        slug,
        publishedDate: blogData.status === "published" ? new Date() : null,
      });

      await blog.save();
      res.status(201).json(blog);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Update blog
  updateBlog: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Handle cover image
      if (req.files && req.files.coverImage) {
        updateData.coverImage = req.files.coverImage[0].path;
        updateData.coverImagePublicId = req.files.coverImage[0].filename;

        // Delete old cover image
        const oldBlog = await Blog.findById(id);
        if (oldBlog?.coverImagePublicId) {
          await cloudinary.uploader.destroy(oldBlog.coverImagePublicId);
        }
      }

      // Handle author image
      if (req.files && req.files.authorImage) {
        const authorData = JSON.parse(updateData.author);
        authorData.imageUrl = req.files.authorImage[0].path;
        authorData.imagePublicId = req.files.authorImage[0].filename;
        updateData.author = authorData;

        // Delete old author image
        const oldBlog = await Blog.findById(id);
        if (oldBlog?.author?.imagePublicId) {
          await cloudinary.uploader.destroy(oldBlog.author.imagePublicId);
        }
      }

      // Update publishedDate if status changes to published
      if (updateData.status === "published") {
        const oldBlog = await Blog.findById(id);
        if (oldBlog.status === "draft") {
          updateData.publishedDate = new Date();
        }
      }

      const blog = await Blog.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      res.json(blog);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete blog
  deleteBlog: async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);

      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      // Delete images from cloudinary
      if (blog.coverImagePublicId) {
        await cloudinary.uploader.destroy(blog.coverImagePublicId);
      }
      if (blog.author.imagePublicId) {
        await cloudinary.uploader.destroy(blog.author.imagePublicId);
      }

      await blog.deleteOne();
      res.json({ message: "Blog deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update author image
  updateAuthorImage: async (req, res) => {
    try {
      const { id } = req.params;

      if (!req.file) {
        return res.status(400).json({ message: "No image provided" });
      }

      const blog = await Blog.findById(id);

      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      // Delete old author image
      if (blog.author.imagePublicId) {
        await cloudinary.uploader.destroy(blog.author.imagePublicId);
      }

      blog.author.imageUrl = req.file.path;
      blog.author.imagePublicId = req.file.filename;

      await blog.save();
      res.json(blog);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateBlogStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const blog = await Blog.findByIdAndUpdate(
        id,
        {
          status,
          publishedDate: status === "published" ? new Date() : null,
        },
        { new: true }
      );

      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      res.json(blog);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getPublishedBlogs: async (req, res) => {
    try {
      const blogs = await Blog.find({ status: "published" })
        .sort({ publishedDate: -1 })
        .select("-content"); // Exclude content for performance
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getBlogBySlug: async (req, res) => {
    try {
      const blog = await Blog.findOne({ slug: req.params.slug });

      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      res.json(blog);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateClaps: async (req, res) => {
    try {
      const blog = await Blog.findByIdAndUpdate(
        req.params.id,
        { $inc: { claps: 1 } },
        { new: true }
      );

      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      res.json(blog);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = blogController;
