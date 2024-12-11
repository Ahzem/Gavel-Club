const Event = require("../models/Event");
const { cloudinary } = require("../config/cloudinary");

const createEvent = async (req, res) => {
  try {
    const eventData = req.body;

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

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .sort({ date: 1 }) // Sort by date ascending
      .lean(); // Convert to plain JS objects for better performance

    res.status(200).json(events);
  } catch (error) {
    console.error("Error details:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({
      message: "Error fetching events",
      error: error.message,
    });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
};
