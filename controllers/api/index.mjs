import express from "express";
import userRoutes from "./user-routes";
import roundRoutes from "./round-routes";
import interviewRoutes from "./interview-routes";
const router = express.Router();

router.use("/user", userRoutes);
router.use("/round", roundRoutes);
router.use("/interviews", interviewRoutes);

export default router;
