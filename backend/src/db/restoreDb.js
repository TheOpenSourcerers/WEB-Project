import { DbContext, DbInit } from "./db.js";

DbInit();

(async () => {
    try {
        await DbContext.sync({ force: true });
        console.log("Database restored.");
    } catch (error) {
        console.error(error.stack);
    }
})();
