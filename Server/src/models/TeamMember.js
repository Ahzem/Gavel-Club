const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
      enum: [
        "President",
        "Secretary",
        "Vice President Education",
        "Vice President Public Relations",
        "Treasurer",
        "Sergeant at arms",
        "Design Lead",
        "Editorial Lead",
        "Media Lead",
        "Publicity Lead",
        "Web Master",
        "Design Committee member",
        "Editorial Committee member",
        "Media Committee member",
        "Web development Committee member",
        "Publicity Committee member",
      ],
    },
    year: {
      type: String,
      required: true,
    },
    thoughts: {
      type: String,
    },
    image: {
      url: String,
      publicId: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TeamMember", teamMemberSchema);
