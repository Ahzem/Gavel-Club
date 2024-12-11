const mongoose = require("mongoose");

const membershipConfigSchema = new mongoose.Schema(
  {
    isOpen: {
      type: Boolean,
      default: true,
    },
    formUrl: {
      type: String,
      required: true,
    },
    closeDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MembershipConfig", membershipConfigSchema);
