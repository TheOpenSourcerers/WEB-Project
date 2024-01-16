import { user } from "../models/user.js";
import { activity } from "../models/activity.js";
import { feedback } from "../models/feedback.js";

export const DbInit = () => {
    user.hasMany(activity, { foreignKey: "userId" });
    activity.hasOne(user, { foreignKey: "userId" });

    activity.hasMany(feedback, { foreignKey: "activityId" });
    feedback.hasOne(activity, { foreignKey: "activityId" });
};
