import express from "express";
import userRoutes from "./user-routes";
import interviewRoutes from "./interview-routes";
const router = express.Router();

router.use("/user", userRoutes);
router.use("/interviews", interviewRoutes);

export default router;
