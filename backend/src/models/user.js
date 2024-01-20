import { Sequelize } from "sequelize";
import { DbContext } from "../db/db.js";

export const user = DbContext.define("Users", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

export const getUserByUsername = async (username) => {
    return user.findOne({ where: { username } });
};

export const createUser = async (username, password, type) => {
    return user.create({ username, password, type });
};
