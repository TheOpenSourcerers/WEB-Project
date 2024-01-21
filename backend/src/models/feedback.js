import { Sequelize } from "sequelize";
import { DbContext } from "../db/db.js";

export const feedback = DbContext.define("Feedback", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    // The activity for which the feedback is given
    activityId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    // The datetime at which the feedback occured
    date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    // The emoji: smiley, frowny, surprised, confused
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

export const getFeedbackCountByActvityId = async (activityId) => {
    let smileyCount = await feedback.count({
        where: { activityId, type: "smiley" },
    });
    let frownyCount = await feedback.count({
        where: { activityId, type: "frowny" },
    });
    let surprisedCount = await feedback.count({
        where: { activityId, type: "surprised" },
    });
    let confusedCount = await feedback.count({
        where: { activityId, type: "confused" },
    });

    return { smileyCount, frownyCount, surprisedCount, confusedCount };
};

export const getFeedbackByActivityId = async (activityId) => {
    return feedback.findAll({ where: { activityId } });
};

export const createFeedback = async (activityId, type) => {
    return feedback.create({ activityId, type, date: new Date() });
};
