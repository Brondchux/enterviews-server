import "dotenv/config";
import express from "express";
import routes from "./controllers";
import db from "./config/connection";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

// URL-encoded & JSON bodies setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes setup
app.use(routes);

// Allow CORS
app.use(
	cors({
		origin: "https://enterviews-client.vercel.app",
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

// Sequelize setup
db.authenticate()
	.then(() => console.log("DB connection has been established successfully."))
	.catch((err) => console.error("Unable to connect to the database:", err));

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
