import express from "express";
import { PORT } from "./src/config.js";
import { logger } from "./src/middleware/logger.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
