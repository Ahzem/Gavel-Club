const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const eventStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "events",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const galleryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "gallery",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const teamStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "team",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const blogCoverStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blogs/covers",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const authorImageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blogs/authors",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const uploadEvent = multer({ storage: eventStorage });
const uploadGallery = multer({ storage: galleryStorage });
const uploadTeam = multer({ storage: teamStorage });
const uploadBlogCover = multer({ storage: blogCoverStorage });
const uploadAuthorImage = multer({ storage: authorImageStorage });

module.exports = {
  uploadEvent,
  uploadGallery,
  cloudinary,
  uploadTeam,
  uploadBlogCover,
  uploadAuthorImage,
};
