const express = require("express");
const router = express.Router();
const { uploadTeam } = require("../config/cloudinary");
const { validateSchema } = require("../middleware/validate");
const { teamMemberSchema } = require("../utils/validators");
const { protect } = require("../middleware/auth");

const {
  getAllMembers,
  createMember,
  updateMember,
  deleteMember,
} = require("../controllers/teamController");

router.get("/", getAllMembers);
router.post(
  "/",
  protect,
  uploadTeam.single("image"),
  validateSchema(teamMemberSchema),
  createMember
);
router.put(
  "/:id",
  protect,
  uploadTeam.single("image"),
  validateSchema(teamMemberSchema),
  updateMember
);
router.delete("/:id", protect, deleteMember);

module.exports = router;
