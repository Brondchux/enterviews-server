const express = require("express");
const xss = require("xss");
const { Round } = require("../../models");
const { Interview } = require("../../models");
const { setStartTime, setEndTime } = require("../../utils/mixins.js");
const protect = require("../../middlewares/auth.js");
const router = express.Router();

// GET /api/interviews
router.get("/", protect, async (req, res) => {
	try {
		const interviews = await Interview.findAll({
			where: { user_id: req.user.id },
			include: [{ model: Round, limit: 1, order: [["count", "DESC"]] }],
			order: [["id", "DESC"]],
		});
		res.status(200).json({
			status: res.statusCode,
			error: false,
			data: interviews,
			message: "Found user interviews.",
		});
	} catch (err) {
		res.status(400).json({
			status: res.statusCode,
			error: true,
			data: null,
			message: "Fetching user interviews failed!",
		});
	}
});

// POST /api/interviews
router.post("/", protect, async (req, res) => {
	let { company = "", role = "", startTime = "", duration = 0 } = req.body;

	// Sanitize fields
	company = xss(company.trim());
	role = xss(role.trim());
	startTime = xss(startTime.trim());
	duration = xss(duration);

	// Validate fields
	if (!company || !role || !startTime || !duration) {
		return res.status(400).json({
			status: res.statusCode,
			error: false,
			data: null,
			message: "Please provide complete interview details",
		});
	}

	try {
		// Interview details
		let interview = await Interview.findOne({
			where: { user_id: req.user.id, company, role },
		});

		// Create the interview if not exsist
		if (!interview) {
			interview = await Interview.create({
				user_id: req.user.id,
				company,
				role,
			});
			interview.save();
		}

		// Calculate the next rounds count
		const lastRound = await Round.findOne({
			where: {
				user_id: req.user.id,
				interview_id: interview.id,
			},
			order: [["id", "DESC"]],
		});
		const nextRound = lastRound ? lastRound.count + 1 : 1;

		// Add interview round
		const round = await Round.create({
			count: nextRound,
			user_id: req.user.id,
			interview_id: interview.id,
			duration,
			start_time: setStartTime(startTime),
			end_time: setEndTime(startTime, duration),
		});
		round.save();

		res.status(201).json({
			status: res.statusCode,
			error: false,
			data: { ...interview.dataValues, round: { count: round.count } },
			message: "Interview successfully created.",
		});
	} catch (err) {
		res.status(400).json({
			status: res.statusCode,
			error: err,
			data: null,
			message: "Creating interview failed!",
		});
	}
});

// PUT /api/interviews
router.put("/", protect, async (req, res) => {
	const id = xss(req.body.id);
	try {
		const interview = await Interview.update(
			{ active: false },
			{ where: { id, user_id: req.user.id }, returning: true, plain: true }
		);
		res.status(200).json({
			status: res.statusCode,
			error: false,
			data: interview[1] || {},
			message: "Updated user interview.",
		});
	} catch (err) {
		res.status(400).json({
			status: res.statusCode,
			error: true,
			data: null,
			message: "Updating user interview failed!",
		});
	}
});

// DELETE /api/interviews
router.delete("/", protect, async (req, res) => {
	const id = xss(req.body.id);
	try {
		await Interview.destroy({ where: { id, user_id: req.user.id } });
		res.status(200).json({
			status: res.statusCode,
			error: false,
			data: null,
			message: "Deleted user interview.",
		});
	} catch (err) {
		res.status(400).json({
			status: res.statusCode,
			error: true,
			data: null,
			message: "Deleting user interview failed!",
		});
	}
});

module.exports = router;
