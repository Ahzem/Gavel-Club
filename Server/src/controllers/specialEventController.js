const SpecialEvent = require('../models/SpecialEvent');
const { cloudinary } = require('../config/cloudinary');

exports.getSpecialEvent = async (req, res) => {
  try {
    const specialEvent = await SpecialEvent.findOne();
    res.json(specialEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createSpecialEvent = async (req, res) => {
  try {
    const existingEvent = await SpecialEvent.findOne();
    if (existingEvent) {
      return res.status(400).json({ message: 'Special event already exists' });
    }

    const { text1, text2 } = req.body;
    const images = req.files;

    if (!images.image1 || !images.image2) {
      return res.status(400).json({ message: 'Both images are required' });
    }

    const specialEvent = new SpecialEvent({
      image1: {
        url: images.image1[0].path,
        publicId: images.image1[0].filename
      },
      image2: {
        url: images.image2[0].path,
        publicId: images.image2[0].filename
      },
      text1,
      text2
    });

    await specialEvent.save();
    res.status(201).json(specialEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSpecialEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { text1, text2 } = req.body;
    const images = req.files;
    
    const specialEvent = await SpecialEvent.findById(id);
    if (!specialEvent) {
      return res.status(404).json({ message: 'Special event not found' });
    }

    // Update texts
    if (text1) specialEvent.text1 = text1;
    if (text2) specialEvent.text2 = text2;

    // Update images if new ones are uploaded
    if (images.image1) {
      // Delete old image from Cloudinary
      await cloudinary.uploader.destroy(specialEvent.image1.publicId);
      specialEvent.image1 = {
        url: images.image1[0].path,
        publicId: images.image1[0].filename
      };
    }

    if (images.image2) {
      await cloudinary.uploader.destroy(specialEvent.image2.publicId);
      specialEvent.image2 = {
        url: images.image2[0].path,
        publicId: images.image2[0].filename
      };
    }

    await specialEvent.save();
    res.json(specialEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};