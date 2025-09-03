// backend/models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: "" },
  interests: { type: [String], default: [] },
  preferredLocations: { type: [String], default: [] },
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
