import express from "express";
import xss from "xss";
import { Round } from "../../models";
const router = express.Router();

// PUT /api/round/:id/:interviewId
router.put("/:id/:interviewId", async (req, res) => {
	const id = xss(req.params.id);
	const interviewId = xss(req.params.interviewId);
	try {
		const round = await Round.update(
			{ completed: true },
			{ where: { id, interview_id: interviewId } }
		);
		res.json({ status: 200, error: false, data: round });
	} catch (err) {
		res.json({ status: 400, error: err, data: null });
	}
});

export default router;
