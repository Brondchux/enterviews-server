import jwt from "jsonwebtoken";
import { User } from "../models";

const protect = async (req, res, next) => {
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			// Get token from header
			const token = req.headers.authorization.split(" ")[1];

			// Verify token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			// Get user data from id encrypted in token
			req.user = await User.findByPk(decoded.id, {
				attributes: { exclude: ["password"] },
			});

			// Continue
			next();
		} catch (err) {
			res.status(401).json({
				status: res.statusCode,
				error: true,
				data: null,
				message: `Not authorized! ${err}`,
			});
		}
	} else {
		res.status(403).json({
			status: res.statusCode,
			error: false,
			data: null,
			message: "You are not authorized to initiate this transaction!",
		});
	}
};

export default protect;
