import express from "express";
const router = express.Router();

// GET /api/interviews
router.get("/", (req, res) => {
	const interviews = [
		{ id: 1, company: "Airtel" },
		{ id: 2, company: "Info Tech" },
	];
	res.send(interviews);
});

// GET /api/interviews/:id
router.get("/:id", (req, res) => {});

export default router;
