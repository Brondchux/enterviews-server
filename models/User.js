const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class User extends Model {
	comparePassword(signinPassword) {
		return bcrypt.compareSync(signinPassword, this.password);
	}
}

User.init(
	{
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		username: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
	},
	{
		hooks: {
			beforeCreate: async (user) => {
				user.password = await bcrypt.hash(user.password, 10);
				return user;
			},
			beforeBulkCreate: (users) => {
				users.forEach((user) => {
					user.dataValues.password = bcrypt.hashSync(user.password, 10);
				});
			},
		},
		sequelize,
		modelName: "user",
		timestamps: true,
		underscored: true,
		freezeTableName: true,
	}
);

module.exports = User;
