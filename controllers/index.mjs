import express from "express";
import homeRoutes from "./home";
import apiRoutes from "./api";
const router = express.Router();

router.use("/", homeRoutes);
router.use("/api", apiRoutes);

export default router;
