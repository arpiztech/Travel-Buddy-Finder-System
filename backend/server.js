// backend/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import buddyRoutes from "./routes/buddyRoutes.js";
import path from "path";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect DB
connectDB(process.env.MONGO_URI);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/buddies", buddyRoutes);

// health
app.get("/api/health", (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
