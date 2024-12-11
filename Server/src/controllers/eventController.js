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

const deleteEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Only attempt to delete image if it exists and has a publicId
    if (event.image && event.image.publicId) {
      try {
        await cloudinary.uploader.destroy(event.image.publicId);
      } catch (cloudinaryError) {
        console.error("Cloudinary deletion error:", cloudinaryError);
        // Continue with event deletion even if image deletion fails
      }
    }

    // Use findByIdAndDelete instead of remove()
    await Event.findByIdAndDelete(id);
    
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ 
      message: "Error deleting event",
      error: error.message 
    });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  deleteEventById,
};
