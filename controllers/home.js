const express = require("express");
const router = express.Router();

// GET "/"
router.get("/", (req, res) => {
	res.status(200).json({
		status: res.statusCode,
		error: false,
		data: null,
		message: "Welcome to Enterviews RESTful APIs.",
	});
});

module.exports = router;
