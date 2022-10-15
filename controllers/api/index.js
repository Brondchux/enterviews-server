const express = require("express");
const userRoutes = require("./user-routes");
const roundRoutes = require("./round-routes");
const interviewRoutes = require("./interview-routes");
const router = express.Router();

router.use("/user", userRoutes);
router.use("/rounds", roundRoutes);
router.use("/interviews", interviewRoutes);

module.exports = router;
