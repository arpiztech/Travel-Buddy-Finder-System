// backend/controllers/profileController.js
import User from "../models/User.js";

export const getProfile = async (req, res) => {
  // req.user is attached by auth middleware
  res.json({ user: req.user });
};

export const updateProfile = async (req, res) => {
  try {
    const updates = {};
    const allowed = ["name", "bio", "interests", "preferredLocations"];
    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }
    // ensure arrays for interests and preferredLocations
    if (updates.interests && !Array.isArray(updates.interests)) updates.interests = updates.interests.split?.(",").map(s=>s.trim()) || [];
    if (updates.preferredLocations && !Array.isArray(updates.preferredLocations)) updates.preferredLocations = updates.preferredLocations.split?.(",").map(s=>s.trim()) || [];

    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select("-password");
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
