import { DbContext } from "./db.js";
import { DbInit } from "./dbInit.js";

DbInit();

(async () => {
    try {
        await DbContext.sync({ force: true });
        console.log("Database restored.");
    } catch (error) {
        console.error(error);
    }
})();
