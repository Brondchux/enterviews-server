import { Round } from "../models";

const rounds = [
	{
		count: 1,
		start_time: "2022-08-19T14:00:00.000Z",
		end_time: "2022-08-19T14:45:00.000Z",
		duration: 0.75,
		completed: true,
		interview_id: 2,
	},
	{
		count: 2,
		start_time: "2022-08-22T15:00:00.000Z",
		end_time: "2022-08-22T16:00:00.000Z",
		duration: 1,
		completed: false,
		interview_id: 2,
	},
	{
		count: 1,
		start_time: "2022-08-17T19:00:00.000Z",
		end_time: "2022-08-17T19:45:00.000Z",
		duration: 0.5,
		completed: true,
		interview_id: 1,
	},
];

const roundData = () => Round.bulkCreate(rounds);

export default roundData;
