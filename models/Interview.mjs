import { Model, DataTypes } from "sequelize";
import db from "../config/connection";

class Interview extends Model {}

Interview.init(
	{
		company: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		role: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		active: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
		},
		user_id: {
			references: {
				model: "user",
				key: "id",
			},
		},
	},
	{
		db,
		modelName: "Interview",
		timestamps: true,
		freezeTableName: true,
		underscored: true,
	}
);

export default Interview;
