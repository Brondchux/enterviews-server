import "dotenv/config";
import db from "../config/connection";
import userData from "./users";
import roundData from "./rounds";
import interviewData from "./interviews";

const seedAll = async () => {
	await db.sync({ force: true });

	await userData();

	await interviewData();

	await roundData();

	process.exit(0);
};

try {
	await seedAll();
} catch (e) {
	throw new Error(`An error occured! ${e}`);
}
