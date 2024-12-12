const mongoose = require("mongoose");

const specialEventSchema = new mongoose.Schema(
  {
    image1: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    image2: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    text1: {
      type: String,
      required: true,
      maxLength: 300,
    },
    text2: {
      type: String,
      required: true,
      maxLength: 300,
    },
  },
  { timestamps: true }
);

// Ensure only one special event exists
specialEventSchema.pre("save", async function (next) {
  const count = await mongoose.model("SpecialEvent").countDocuments();
  if (count > 0 && this.isNew) {
    next(new Error("Only one special event can exist"));
  }
  next();
});

module.exports = mongoose.model("SpecialEvent", specialEventSchema);
