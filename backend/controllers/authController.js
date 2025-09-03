// backend/controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already used" });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashed });
    const token = signToken(user._id);
    const safeUser = (({ _id, name: n, email: e, bio, interests, preferredLocations }) => ({ id: _id, name: n, email: e, bio, interests, preferredLocations }))(user);

    res.json({ user: safeUser, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Missing fields" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = signToken(user._id);
    const safeUser = (({ _id, name, email, bio, interests, preferredLocations }) => ({ id: _id, name, email, bio, interests, preferredLocations }))(user);

    res.json({ user: safeUser, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
