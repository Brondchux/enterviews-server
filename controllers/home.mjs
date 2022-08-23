import express from "express";
const router = express.Router();

// GET "/"
router.get("/", (req, res) => {
	res.status(200).json({
		status: res.statusCode,
		error: false,
		data: { message: "Welcome to Enterviews RESTful APIs." },
	});
});

export default router;
