// backend/controllers/buddyController.js
import User from "../models/User.js";
import BuddyRequest from "../models/BuddyRequest.js";
import Trip from "../models/Trip.js";
import mongoose from "mongoose";

export const searchBuddies = async (req, res) => {
  try {
    const { destination = "", interests = [] } = req.body || {};
    // fetch other users
    const users = await User.find({ _id: { $ne: req.user._id } }).select("-password");
    // simple scoring
    const me = req.user;
    const parsedInterests = Array.isArray(interests) ? interests : (interests ? interests.split(",").map(s=>s.trim()) : []);
    const scored = users.map(u => {
      let score = 0;
      const shared = (u.interests || []).filter(i => me.interests?.includes(i)).length;
      score += shared;
      if (destination) {
        if ((u.preferredLocations || []).some(p => p.toLowerCase().includes(destination.toLowerCase()))) score += 1;
      }
      if (parsedInterests.length) score += (u.interests || []).filter(i => parsedInterests.includes(i)).length;
      return { user: u, score };
    });
    scored.sort((a,b)=>b.score - a.score);
    res.json({ results: scored.map(s=>({ ...s.user.toObject(), _score: s.score })) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const sendRequest = async (req, res) => {
  try {
    const { toId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(toId)) return res.status(400).json({ message: "Invalid toId" });
    if (toId === String(req.user._id)) return res.status(400).json({ message: "Cannot send request to yourself" });

    const existing = await BuddyRequest.findOne({ fromId: req.user._id, toId });
    if (existing) return res.status(400).json({ message: "Request already sent" });

    const r = await BuddyRequest.create({ fromId: req.user._id, toId });
    res.json({ request: r });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const listRequestsForUser = async (req, res) => {
  try {
    const reqs = await BuddyRequest.find({ toId: req.user._id }).populate("fromId", "-password");
    res.json({ requests: reqs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const respondRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body; // 'accept' | 'reject'
    const reqDoc = await BuddyRequest.findOne({ _id: id, toId: req.user._id });
    if (!reqDoc) return res.status(404).json({ message: "Not found" });
    reqDoc.status = action === "accept" ? "accepted" : "rejected";
    await reqDoc.save();
    res.json({ request: reqDoc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
