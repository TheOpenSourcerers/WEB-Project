import { Sequelize, where } from "sequelize";
import { DbContext } from "../db/db.js";

export const activity = DbContext.define("Activities", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    // The author of the activity
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    accessCode: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

export const getActivityById = async (id) => {
    return activity.findOne({ where: { id } });
};

export const getActivitiesByUserId = async (userId) => {
    return activity.findAll({ where: { userId } });
};

export const createActivity = async (userId, date, duration, description) => {
    const accessCode = (Math.random() + 1).toString(36).substring(7);

    return activity.create({ userId, date, duration, description, accessCode });
};
