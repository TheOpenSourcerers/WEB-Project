import { getUserByUsername, createUser } from "../models/user.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import express from "express";

export const userController = express.Router();

userController.route("/login").post(async (req, res) => {
    const { username, password } = req.body;

    // validate
    if (!username || !password) return res.status(400).json("Bad request");

    // grab the user that has the username
    const user = await getUserByUsername(username);
    if (!user) return res.status(403).json("Username or password is wrong.");

    // check the password using bcrypt
    if (!(await bcrypt.compare(password, user.password)))
        return res.status(403).json("Username or password is wrong.");

    // return the jwt token
    return res.status(200).json({
        username: user.username,
        userid: user.id,
        type: user.type,
        token: generateToken(user),
    });
});

userController.route("/register").post(async (req, res) => {
    const { username, password, type } = req.body;

    // validate
    if (!username || !password || !type)
        return res.status(400).json("Bad request");

    if (type !== "student" && type !== "teacher")
        return res.status(400).json("Bad user type.");

    let user = await getUserByUsername(username);
    if (user) return res.status(400).json("Username already exists");

    // generate password
    const salt = await bcrypt.genSalt(8);
    const hash = await bcrypt.hash(password, salt);
    user = await createUser(username, hash, type);

    // return the jwt token
    return res.status(201).json({
        username: user.username,
        userid: user.id,
        type: user.type,
        token: generateToken(user),
    });
});
