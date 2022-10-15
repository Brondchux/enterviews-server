require("dotenv/config");
const db = require("../config/connection");
const userData = require("./users");
const roundData = require("./rounds");
const interviewData = require("./interviews");

const seedAll = async () => {
	await db.sync({ force: false });

	await userData();

	await interviewData();

	await roundData();

	process.exit(0);
};

try {
	await seedAll();
	console.log("Seeded DB successfully!");
} catch (e) {
	throw new Error(`This error occured while seeding DB: ${e}`);
}
