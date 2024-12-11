const Gallery = require("../models/Gallery");
const cloudinary = require("../config/cloudinary").cloudinary;

exports.getAllImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ captureDate: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createImage = async (req, res) => {
  try {
    const { alt, captureDate } = req.body;
    const image = await Gallery.create({
      src: {
        url: req.file.path,
        publicId: req.file.filename,
      },
      alt,
      captureDate,
    });
    res.status(201).json(image);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateImage = async (req, res) => {
  try {
    const { alt, captureDate } = req.body;
    const image = await Gallery.findByIdAndUpdate(
      req.params.id,
      { alt, captureDate },
      { new: true }
    );
    res.json(image);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    await cloudinary.uploader.destroy(image.src.publicId);
    await image.deleteOne();
    res.json({ message: "Image deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
