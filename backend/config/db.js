// backend/config/db.js
import mongoose from "mongoose";

export default async function connectDB(uri) {
  try {
    await mongoose.connect(uri, { dbName: "travelbuddy" });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}
