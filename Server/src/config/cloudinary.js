const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Events storage configuration
const eventStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "events",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

// Gallery storage configuration
const galleryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "gallery",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const uploadEvent = multer({ storage: eventStorage });
const uploadGallery = multer({ storage: galleryStorage });

module.exports = { uploadEvent, uploadGallery, cloudinary };
