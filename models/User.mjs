import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection";

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
		sequelize,
		modelName: "user",
		timestamps: true,
		underscored: true,
		freezeTableName: true,
	}
);

export default User;
