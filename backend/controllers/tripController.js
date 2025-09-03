// backend/controllers/tripController.js
import Trip from "../models/Trip.js";

export const createTrip = async (req, res) => {
  try {
    const payload = { ...req.body, userId: req.user._id };
    const trip = await Trip.create(payload);
    res.json({ trip });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const listMyTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ trips });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const t = await Trip.findOneAndDelete({ _id: id, userId: req.user._id });
    if (!t) return res.status(404).json({ message: "Trip not found or not allowed" });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
