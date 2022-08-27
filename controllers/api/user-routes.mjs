import express from "express";
import xss from "xss";
import jwt from "jsonwebtoken";
import { User } from "../../models";
const router = express.Router();
const generateToken = (id) => {
	if (!id) return;
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

// POST /api/user/signup
router.post("/signup", async (req, res) => {
	let { email, password } = req.body;

	// Validate fields
	if (!email || !password) {
		return res.status(400).json({
			status: res.statusCode,
			error: false,
			data: null,
			message: "Please provide email and/or password",
		});
	}

	// Sanitize fields
	email = xss(req.body.email);
	password = xss(req.body.password);
	const username = email.split("@")[0];

	try {
		// Check duplicate user
		const userExists = await User.findOne({ where: { email } });
		if (userExists) {
			return res.status(401).json({
				status: res.statusCode,
				error: false,
				data: null,
				message: "User already exsist!",
			});
		}

		// Create user account
		const user = await User.create({ email, password, username });
		user.save();
		res.status(201).json({
			status: res.statusCode,
			error: false,
			data: {
				id: user.id,
				email: user.email,
				username: user.username,
				token: generateToken(user.id),
			},
			message: "Account successfully created.",
		});
	} catch (err) {
		res.status(400).json({
			status: res.statusCode,
			error: true,
			data: null,
			message: "Creating user account failed!",
		});
	}
});

// POST /api/user/signin
router.post("/signin", async (req, res) => {
	let { email, password } = req.body;

	// Validate fields
	if (!email || !password) {
		return res.status(400).json({
			status: res.statusCode,
			error: false,
			data: null,
			message: "Please provide email and/or password",
		});
	}

	// Sanitize fields
	email = xss(req.body.email);
	password = xss(req.body.password);

	try {
		// Compare user password
		const user = await User.findOne({ where: { email } });
		if (!user.comparePassword(password)) {
			return res.status(401).json({
				status: res.statusCode,
				error: false,
				data: null,
				message: "Incorrect email and password combination!",
			});
		}

		// Brad - JWT Sign Verify https://www.youtube.com/watch?v=enopDSs3DRw
		// Dave  - RTK Query https://www.youtube.com/watch?v=-JJFQ9bkUbo
		res.status(200).json({
			status: res.statusCode,
			error: false,
			data: {
				id: user.id,
				email: user.email,
				username: user.username,
				token: generateToken(user.id),
			},
			message: "User successfully signed in.",
		});
	} catch (err) {
		res.status(400).json({
			status: res.statusCode,
			error: true,
			data: null,
			message: "Invalid sign in credentials!",
		});
	}
});

// POST /api/user/me
router.post("/me", async (req, res) => {
	const id = xss(req.body.id);
	try {
		const user = await User.findByPk(id);
		res.status(200).json({ status: res.statusCode, error: false, data: user });
	} catch (err) {
		res.status(400).json({ status: res.statusCode, error: err, data: null });
	}
});

export default router;
