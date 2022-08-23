import express from "express";
import xss from "xss";
import { User } from "../../models";
import { Interview } from "../../models";
const router = express.Router();

// GET /api/interviews
router.get("/", async (req, res) => {
	const interviews = await Interview.findAll({
		include: { model: User, attributes: { exclude: ["password"] } },
	});
	res.status(200).json({
		status: res.statusCode,
		error: false,
		data: interviews,
	});
});

// GET /api/interviews/:id
router.get("/:id", async (req, res) => {
	const id = xss(req.params.id);
	const interview = await Interview.findOne({
		where: { id },
		include: { model: User, attributes: { exclude: ["password"] } },
	});
	res.status(200).json({
		status: res.statusCode,
		error: false,
		data: interview,
	});
});

export default router;
