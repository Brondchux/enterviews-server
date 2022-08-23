import User from "./User";
import Round from "./Round";
import Interview from "./Interview";

// Define models relationships or association

User.hasMany(Interview, { foreignKey: "user_id" });
Interview.belongsTo(User, { foreignKey: "user_id" });

Interview.hasMany(Round, { foreignKey: "interview_id" });
Round.belongsTo(Interview, { foreignKey: "interview_id", onDelete: "CASCADE" });

export { User, Round, Interview };
