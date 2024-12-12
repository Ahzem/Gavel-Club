const TeamMember = require("../models/TeamMember");
const { cloudinary } = require("../config/cloudinary");

exports.getAllMembers = async (req, res) => {
  try {
    const members = await TeamMember.find().sort({ position: 1, year: -1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createMember = async (req, res) => {
  try {
    console.log("Received file:", req.file); // Debug log

    let imageData;
    if (req.file) {
      imageData = {
        url: req.file.path,
        publicId: req.file.filename
      };
      console.log("Image data:", imageData); // Debug log
    }

    const memberData = {
      ...req.body,
      image: imageData
    };

    console.log("Member data before save:", memberData); // Debug log

    const member = await TeamMember.create(memberData);
    res.status(201).json(member);
  } catch (error) {
    console.error("Error creating member:", error); // Debug log
    res.status(400).json({ message: error.message });
  }
};

exports.updateMember = async (req, res) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    console.log("Update received file:", req.file); // Debug log

    if (req.file) {
      // Delete old image if exists
      if (member.image?.publicId) {
        try {
          await cloudinary.uploader.destroy(member.image.publicId);
        } catch (error) {
          console.error("Error deleting old image:", error);
        }
      }

      // Update with new image
      member.image = {
        url: req.file.path,
        publicId: req.file.filename
      };
      console.log("New image data:", member.image); // Debug log
    }

    Object.assign(member, req.body);
    const updatedMember = await member.save();
    res.json(updatedMember);
  } catch (error) {
    console.error("Error updating member:", error); // Debug log
    res.status(400).json({ message: error.message });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    if (member.image?.publicId) {
      await cloudinary.uploader.destroy(member.image.publicId);
    }

    await member.deleteOne();
    res.json({ message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
