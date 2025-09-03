// backend/models/Trip.js
import mongoose from "mongoose";

const TripSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  destination: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  budget: { type: Number, default: 0 },
  activities: { type: String, default: "" },
  visibility: { type: String, enum: ["public", "private"], default: "public" }
}, { timestamps: true });

export default mongoose.model("Trip", TripSchema);
