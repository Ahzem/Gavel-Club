const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Educational meeting", "Fun activity", "other"],
      required: true,
    },
    image: {
      url: String,
      publicId: String,
    },
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed"],
      default: "upcoming",
    },
    registrationUrl: String,
    capacity: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
