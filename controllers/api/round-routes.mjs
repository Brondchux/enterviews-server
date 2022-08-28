import express from "express";
import xss from "xss";
import protect from "../../middlewares/auth.mjs";
import { Round } from "../../models";
const router = express.Router();

// PUT /api/rounds/:interviewId/:id
router.put("/:interviewId/:id", protect, async (req, res) => {
	const id = xss(req.params.id);
	const interviewId = xss(req.params.interviewId);
	try {
		const round = await Round.update(
			{ completed: true },
			{
				where: { id, user_id: req.user.id, interview_id: interviewId },
				returning: true,
				plain: true,
			}
		);
		res.status(200).json({
			status: res.statusCode,
			error: false,
			data: round,
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

export default router;
