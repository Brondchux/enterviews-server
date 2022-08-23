import { Model, DataTypes } from "sequelize";
import db from "../config/connection";

class User extends Model {}

User.init(
	{
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		db,
		modelName: "User",
		timestamps: true,
		freezeTableName: true,
		underscored: true,
	}
);

export default User;
