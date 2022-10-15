import { Interview } from "../models";

const interviews = [
	{
		user_id: 2,
		company: "Globe",
		role: "Node JS Developer",
	},
	{
		user_id: 1,
		company: "Nationu",
		role: "React JS Developer",
	},
];

const interviewData = () => Interview.bulkCreate(interviews);

export default interviewData;
