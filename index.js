import "dotenv/config";
import express from "express";
const app = express();
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
	res.send("Hello world!");
});

app.get("/interviews", (req, res) => {
	const interviews = [
		{ id: 1, company: "Airtel" },
		{ id: 2, company: "Infosys" },
	];
	res.send(interviews);
});

app.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT}`);
});
