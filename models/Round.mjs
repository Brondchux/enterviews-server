import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection";

class Round extends Model {}

Round.init(
	{
		count: {
			type: DataTypes.SMALLINT,
			allowNull: false,
		},
		start_time: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		end_time: {
			type: DataTypes.DATE,
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
		interview_id: {
			type: DataTypes.INTEGER,
			references: {
				model: "interview",
				key: "id",
			},
		},
	},
	{
		sequelize,
		modelName: "round",
		timestamps: true,
		underscored: true,
		freezeTableName: true,
	}
);

export default Round;
