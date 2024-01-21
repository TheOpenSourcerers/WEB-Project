import express from "express";
import { authorize, authorizeTeacher } from "../middleware/auth.js";
import {
    createActivity,
    getActivitiesByUserId,
    getActivityById,
} from "../models/activity.js";

export const activityController = express.Router();

activityController
    .route("/getActivityById")
    .get(authorize, async (req, res) => {
        const { activityId } = req.body;

        if (!activityId) return res.status(400).json("Bad request");

        return res.status(200).json(await getActivityById(activityId));
    });

activityController
    .route("/getActivities")
    .get(authorizeTeacher, async (req, res) => {
        const { userid } = req.decodedToken;

        if (!userid)
            return res.status(400).json("Missing userid from access token.");

        return res.status(200).json(await getActivitiesByUserId(userid));
    });

activityController
    .route("/createActivity")
    .post(authorizeTeacher, async (req, res) => {
        const { userid } = req.decodedToken;

        if (!userid)
            return res.status(400).json("Missing userid from access token.");

        const { date, duration, description, accessCode } = req.body;

        if (!date || !duration || !description)
            return res.status(400).json("Bad request");

        return res
            .status(200)
            .json(
                await createActivity(
                    userid,
                    new Date(date),
                    duration,
                    description
                )
            );
    });
