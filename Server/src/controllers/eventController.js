const Event = require("../models/Event");
const { cloudinary } = require("../config/cloudinary");

const createEvent = async (req, res) => {
  try {
    const eventData = req.body;

    // Add image data if file was uploaded
    if (req.file) {
      eventData.image = {
        url: req.file.path,
        publicId: req.file.filename,
      };
    }

    const event = await Event.create(eventData);
    res.status(201).json(event);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Error creating event" });
  }
};

module.exports = {
  createEvent,
};
