// backend/routes/tripRoutes.js
import express from "express";
import { createTrip, listMyTrips, deleteTrip } from "../controllers/tripController.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();

router.post("/", auth, createTrip);
router.get("/", auth, listMyTrips);
router.delete("/:id", auth, deleteTrip);

export default router;
