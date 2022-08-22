// import "dotenv/config";
import express from "express";
import routes from "./controllers";
import sequelize from "./config/connection";

const app = express();
const PORT = process.env.PORT || 3001;

// console.log(routes);

// Routes setup
app.use(routes);

// Sequelize setup
// sequelize.sync({ force: false }).then(() => {
app.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT}`);
});
// });
