import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config.js";

export const authorize = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json("Authorization header not provided");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json("No token provided");
    }

    jwt.verify(token, JWT_KEY, (err, decodedToken) => {
        if (err) {
            return res.status(401).json("Invalid token");
        }
        req.decodedToken = decodedToken;
        next();
    });
};

export const authorizeStudent = (req, res, next) => {
    authorize(req, res, () => {
        if (req.decodedToken.type === "student") {
            next();
        } else {
            return res.status(403).json("Forbidden");
        }
    });
};

export const authorizeTeacher = (req, res, next) => {
    authorize(req, res, () => {
        if (req.decodedToken.type === "teacher") {
            next();
        } else {
            return res.status(403).json("Forbidden");
        }
    });
};
