import express from "express";
const router = express.Router();

// GET /api/user/:id
router.get("/:id", (req, res) => {});

// POST /api/user/signin
router.post("/signin", (req, res) => {});

// POST /api/user/signup
router.post("/signup", (req, res) => {});

export default router;
