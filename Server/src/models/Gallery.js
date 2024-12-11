const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  src: {
    url: { type: String, required: true },
    publicId: { type: String, required: true }
  },
  alt: { type: String, required: true },
  captureDate: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);