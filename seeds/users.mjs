import { User } from "../models";

const users = [
	{
		username: "brond",
		email: "brond@gmail.com",
		password: "asdfjkl;",
	},
	{
		username: "chux",
		email: "chux@gmail.com",
		password: "jkl;asdf",
	},
];

const userData = () => User.bulkCreate(users);

export default userData;
