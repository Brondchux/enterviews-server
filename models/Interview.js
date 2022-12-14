const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

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
			type: DataTypes.INTEGER,
			references: {
				model: "user",
				key: "id",
			},
		},
	},
	{
		sequelize,
		modelName: "interview",
		timestamps: true,
		underscored: true,
		freezeTableName: true,
	}
);

module.exports = Interview;
