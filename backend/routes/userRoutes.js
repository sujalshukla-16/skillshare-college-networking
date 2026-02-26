import express from "express";
import protect from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// Get logged-in user
router.get("/me", protect, async (req, res) => {
  res.json(req.user);
});

// Update profile
router.put("/me", protect, async (req, res) => {
  try {
    const { name, bio, skills, department } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.bio = bio || user.bio;
    user.department = department || user.department;

    if (skills) {
      user.skills = skills.split(","); // "js,react,node"
    }

    await user.save();

    res.json({
      message: "Profile updated",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
