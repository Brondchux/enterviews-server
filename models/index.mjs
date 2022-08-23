import User from "./User.mjs";
import Round from "./Round.mjs";
import Interview from "./Interview.mjs";

// Define models relationships or association

User.hasMany(Interview, { foreignKey: "user_id" });
Interview.belongsTo(User, { foreignKey: "user_id" });

Interview.hasMany(Round, { foreignKey: "interview_id" });
Round.belongsTo(Interview, { foreignKey: "interview_id" });

export default { User, Round, Interview };
