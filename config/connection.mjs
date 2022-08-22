import Sequelize from "sequelize";

let sequelize;
// TODO: Replace with postgres deployment version and uncomment
// if (process.env.JAWS_DB) {
// 	sequelize = new Sequelize(process.env.JAWS_DB);
// }
// else {
sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASS,
	{
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: "postgres",
		logging: false,
	}
);
// }

export default sequelize;
