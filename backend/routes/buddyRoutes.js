// backend/routes/buddyRoutes.js
import express from "express";
import { searchBuddies, sendRequest, listRequestsForUser, respondRequest } from "../controllers/buddyController.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();

router.post("/search", auth, searchBuddies);
router.post("/request", auth, sendRequest);
router.get("/requests", auth, listRequestsForUser);
router.post("/requests/:id/respond", auth, respondRequest);

export default router;
