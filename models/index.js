const User = require("./User");
const Round = require("./Round");
const Interview = require("./Interview");

// Define models relationships or association

User.hasMany(Interview, { foreignKey: "user_id" });
Interview.belongsTo(User, { foreignKey: "user_id" });

Interview.hasMany(Round, { foreignKey: "interview_id" });
Round.belongsTo(Interview, { foreignKey: "interview_id", onDelete: "CASCADE" });

module.exports = { User, Round, Interview };
