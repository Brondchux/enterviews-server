import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection";
import bcrypt from "bcrypt";

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
		},
		sequelize,
		modelName: "user",
		timestamps: true,
		underscored: true,
		freezeTableName: true,
	}
);

export default User;
