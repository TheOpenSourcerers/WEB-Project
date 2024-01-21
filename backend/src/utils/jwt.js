import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config.js";

export const generateToken = (user) => {
    return jwt.sign(
        {
            userid: user.id,
            type: user.type,
            username: user.username,
        },
        JWT_KEY,
        {
            expiresIn: "24h",
        }
    );
};
