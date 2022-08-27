import express from "express";
import xss from "xss";
import { User } from "../../models";
import { Interview } from "../../models";
import protect from "../../middlewares/auth.mjs";
const router = express.Router();

// GET /api/interviews
router.get("/", protect, async (req, res) => {
	try {
		const interviews = await Interview.findAll({
			where: { id: req.user.id },
			include: { model: User, attributes: { exclude: ["password"] } },
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

// GET /api/interviews/:id
router.get("/:id", protect, async (req, res) => {
	const id = xss(req.params.id);
	try {
		const interview = await Interview.findOne({
			where: { id, user_id: req.user.id },
		});
		res.status(200).json({
			status: res.statusCode,
			error: false,
			data: interview,
			message: "Found user interview.",
		});
	} catch (err) {
		res.status(400).json({
			status: res.statusCode,
			error: true,
			data: null,
			message: "Fetching user interview failed!",
		});
	}
});

// PUT /api/interviews/:id
router.put("/:id", protect, async (req, res) => {
	const id = xss(req.params.id);
	try {
		const interview = await Interview.update(
			{ active: false },
			{ where: { id, user_id: req.user.id }, returning: true, plain: true }
		);
		res.status(200).json({
			status: res.statusCode,
			error: false,
			data: interview,
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

// DELETE /api/interviews/:id
router.delete("/:id", protect, async (req, res) => {
	const id = xss(req.params.id);
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

export default router;
