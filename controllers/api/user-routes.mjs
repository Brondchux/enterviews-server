import express from "express";
import xss from "xss";
const router = express.Router();
import { User } from "../../models";

// GET /api/user/:id
router.get("/:id", async (req, res) => {
	const id = xss(req.params.id);
	console.log("jey");
	try {
		const user = await User.findByPk(id);
		// res.json({ status: 200, error: false, data: user });
	} catch (err) {
		res.json({ status: 400, error: err, data: null });
	}
});

// POST /api/user/signin
router.post("/signin", async (req, res) => {
	const email = xss(req.body.email);
	const password = xss(req.body.password);
	try {
		const user = await User.findOne({ where: { email } });
		if (!user.comparePassword(password)) {
			return res.json({
				status: 201,
				error: true,
				data: { message: "Incorrect email or password combination!" },
			});
		}
		user.password = null;

		// TODO: Generate JWT
		res.json({ status: 200, error: false, data: user });
	} catch (err) {
		res.json({ status: 400, error: err, data: null });
	}
});

// POST /api/user/signup
router.post("/signup", async (req, res) => {
	const email = xss(req.body.email);
	const password = xss(req.body.password);
	const username = email.split("@")[0];
	try {
		const user = await User.create({ email, password, username });
		user.save();
		res.json({ status: 200, error: false, data: user });
	} catch (err) {
		res.json({ status: 400, error: err, data: null });
	}
});

export default router;
