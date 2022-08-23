import express from "express";
import xss from "xss";
import { User } from "../../models";
import { Interview } from "../../models";
const router = express.Router();

// GET /api/interviews
router.get("/", async (req, res) => {
	try {
		const interviews = await Interview.findAll({
			include: { model: User, attributes: { exclude: ["password"] } },
		});
		res.json({ status: 200, error: false, data: interviews });
	} catch (err) {
		res.json({ status: 400, error: err, data: null });
	}
});

// GET /api/interviews/:id
router.get("/:id", async (req, res) => {
	const id = xss(req.params.id);
	try {
		const interview = await Interview.findOne({
			where: { id },
			include: { model: User, attributes: { exclude: ["password"] } },
		});
		res.json({ status: 200, error: false, data: interview });
	} catch (err) {
		res.json({ status: 400, error: err, data: null });
	}
});

// PUT /api/interviews/:userId/:id
router.put("/:userId/:id", async (req, res) => {
	const userId = xss(req.params.userId);
	const id = xss(req.params.id);
	try {
		const interview = await Interview.update(
			{ active: false },
			{ where: { id, user_id: userId }, returning: true, plain: true }
		);
		res.json({ status: 200, error: false, data: interview });
	} catch (err) {
		res.json({ status: 400, error: err, data: null });
	}
});

// DELETE /api/interviews/:userId/:id
router.delete("/:userId/:id", async (req, res) => {
	const userId = xss(req.params.userId);
	const id = xss(req.params.id);
	try {
		await Interview.destroy({ where: { id, user_id: userId } });
		res.json({ status: 200, error: false, data: { destroyed: true } });
	} catch (err) {
		res.json({ status: 400, error: err, data: null });
	}
});

export default router;
