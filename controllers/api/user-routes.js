import express from "express";
import xss from "xss";
import jwt from "jsonwebtoken";
import protect from "../../middlewares/auth.js";
import { User } from "../../models";
const router = express.Router();
const generateToken = (id) => {
	if (!id) return;
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

// POST /api/user/signup
router.post("/signup", async (req, res) => {
	let { email = "", password = "" } = req.body;

	// Sanitize fields
	email = xss(email.trim());
	password = xss(password.trim());

	// Validate fields
	if (!email || !password) {
		return res.status(400).json({
			status: res.statusCode,
			error: false,
			data: null,
			message: "Please provide email and/or password",
		});
	}

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
		const user = await User.create({
			email,
			password,
			username: email.split("@")[0],
		});
		user.save();
		res.status(201).json({
			status: res.statusCode,
			error: false,
			data: {
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
	let { email = "", password = "" } = req.body;

	// Sanitize fields
	email = xss(email.trim());
	password = xss(password.trim());

	// Validate fields
	if (!email || !password) {
		return res.status(400).json({
			status: res.statusCode,
			error: false,
			data: null,
			message: "Please provide email and/or password",
		});
	}

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

		res.status(200).json({
			status: res.statusCode,
			error: false,
			data: {
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

// GET /api/user/me
router.get("/me", protect, async (req, res) => {
	/**
	 * The "protect" middleware already has our user data from db, using the "id" encrypted in jwt.
	 * We can simply send back the req.user and not re-fetch it from database.
	 */
	try {
		res.status(200).json({
			status: res.statusCode,
			error: false,
			data: await req.user,
			message: "Found user data.",
		});
	} catch (err) {
		res.status(400).json({
			status: res.statusCode,
			error: err,
			data: null,
			message: "Invalid user data!",
		});
	}
});

export default router;
