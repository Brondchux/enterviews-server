import express from "express";
import xss from "xss";
import protect from "../../middlewares/auth.mjs";
import { Round } from "../../models";
const router = express.Router();

// GET /api/rounds/:interviewId
router.get("/:interviewId", protect, async (req, res) => {
	const interviewId = xss(req.params.interviewId);
	try {
		const rounds = await Round.findAll({
			where: { interview_id: interviewId, user_id: req.user.id },
			order: [["count", "DESC"]],
		});
		res.status(200).json({
			status: res.statusCode,
			error: false,
			data: rounds,
			message: "Found interview rounds.",
		});
	} catch (err) {
		res.status(400).json({
			status: res.statusCode,
			error: true,
			data: null,
			message: "Fetching interview rounds failed!",
		});
	}
});

// PUT /api/rounds
router.put("/", protect, async (req, res) => {
	const roundId = xss(req.body.roundId);
	const interviewId = xss(req.body.interviewId);
	try {
		const round = await Round.update(
			{ completed: true },
			{
				where: { id: roundId, interview_id: interviewId, user_id: req.user.id },
				returning: true,
				plain: true,
			}
		);
		res.status(200).json({
			status: res.statusCode,
			error: false,
			data: round[1] || {},
			message: "Updated interview round.",
		});
	} catch (err) {
		res.status(400).json({
			status: res.statusCode,
			error: true,
			data: null,
			message: "Updating interview round failed!",
		});
	}
});

// DELETE /api/rounds
router.delete("/", protect, async (req, res) => {
	const roundId = xss(req.body.roundId);
	const interviewId = xss(req.body.interviewId);
	try {
		const roundsCount = await Round.count({
			where: {
				user_id: req.user.id,
				interview_id: interviewId,
			},
		});
		if (roundsCount === 1) {
			return res.status(403).json({
				status: res.statusCode,
				error: true,
				data: null,
				message: "Last round of an interview cannot be deleted.",
			});
		}

		await Round.destroy({
			where: { id: roundId, interview_id: interviewId, user_id: req.user.id },
		});
		res.status(200).json({
			status: res.statusCode,
			error: false,
			data: null,
			message: "Deleted interview round.",
		});
	} catch (err) {
		res.status(400).json({
			status: res.statusCode,
			error: true,
			data: null,
			message: "Deleting interview round failed!",
		});
	}
});

export default router;
