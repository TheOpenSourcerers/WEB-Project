import express from "express";
import { PORT } from "./src/config.js";
import { logger } from "./src/middleware/logger.js";
import { errorHandler } from "./src/middleware/errorHandler.js";
import { DbInit } from "./src/db/dbInit.js";
import { userController } from "./src/controllers/userController.js";

// Database
DbInit();

// Express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);
app.use(errorHandler);

app.use("/api", userController);

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
