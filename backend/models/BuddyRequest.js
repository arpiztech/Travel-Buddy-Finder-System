// backend/models/BuddyRequest.js
import mongoose from "mongoose";

const BuddyRequestSchema = new mongoose.Schema({
  fromId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  toId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" }
}, { timestamps: true });

export default mongoose.model("BuddyRequest", BuddyRequestSchema);
