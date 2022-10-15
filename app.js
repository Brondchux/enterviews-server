require("dotenv/config");
const express = require("express");
const routes = require("./controllers");
const db = require("./config/connection");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// Allow CORS
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// URL-encoded & JSON bodies setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes setup
app.use(routes);

// Sequelize setup
db.authenticate()
	.then(() => console.log("DB connection has been established successfully."))
	.catch((err) => console.error("Unable to connect to the database:", err));

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
