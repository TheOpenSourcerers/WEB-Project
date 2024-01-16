import { Sequelize } from "sequelize";
import { DbContext } from "../db/db.js";

export const activity = DbContext.define("Activities", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    // The author of the activity
    userID: {
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
