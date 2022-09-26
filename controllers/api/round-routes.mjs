import express from "express";
import xss from "xss";
import protect from "../../middlewares/auth.mjs";
import { Round } from "../../models";
const router = express.Router();

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
