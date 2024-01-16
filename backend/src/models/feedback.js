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
    // The emoji
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});
