const setStartTime = (dateTimeString = Date.now()) => {
	return new Date(dateTimeString);
};

const setEndTime = (startTime = Date.now(), duration = 0) => {
	const date = new Date(startTime);
	duration = parseFloat(duration);
	const addTime = date.setTime(date.getTime() + duration * 60 * 60 * 1000);
	return new Date(addTime);
};

module.exports = {
	setStartTime,
	setEndTime,
};
