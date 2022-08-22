import { Router as router } from "express";
import userRoutes from "./user-routes";
import interviewRoutes from "./interview-routes";

router.use("/user", userRoutes);
router.use("/interviews", interviewRoutes);

module.exports = router;
