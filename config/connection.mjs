import Sequelize from "sequelize";

const sequelize = process.env.POSTGRES_URI
	? new Sequelize(process.env.POSTGRES_URI, { logging: false })
	: new Sequelize(
			process.env.DB_NAME,
			process.env.DB_USER,
			process.env.DB_PASS,
			{
				host: "localhost",
				dialect: "postgres",
				logging: false,
			}
	  );

export default sequelize;
