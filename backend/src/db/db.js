import { Sequelize } from "sequelize";

export const DbContext = new Sequelize({
    dialect: "sqlite",
    storage: "database.db",
    logging: false,
    define: {
        freezeTableName: true,
    },
});
