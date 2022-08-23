import { Model, DataTypes } from "sequelize";
import db from "../config/connection";

class Round extends Model {}

Round.init(
	{
		count: {
			type: DataTypes.SMALLINT,
			allowNull: false,
		},
		start_time: {
			type: DataTypes.NOW,
			allowNull: false,
		},
		end_time: {
			type: DataTypes.NOW,
			allowNull: false,
		},
		duration: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		completed: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		user_id: {
			references: {
				model: "user",
				key: "id",
			},
		},
		interview_id: {
			references: {
				model: "interview",
				key: "id",
			},
		},
	},
	{
		db,
		modelName: "Round",
		timestamps: true,
		freezeTableName: true,
		underscored: true,
	}
);

export default Round;
