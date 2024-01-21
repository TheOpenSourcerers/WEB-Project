import express from "express";
import {
    authorize,
    authorizeTeacher,
    authorizeStudent,
} from "../middleware/auth.js";
import { getActivityById } from "../models/activity.js";
import {
    createFeedback,
    getFeedbackByActivityId,
    getFeedbackCountByActvityId,
} from "../models/feedback.js";

export const feedbackController = express.Router();

feedbackController
    .route("/createFeedback")
    .post(authorizeStudent, async (req, res) => {
        const { activityId, accessCode, type } = req.body;

        if (!activityId || !accessCode || !type)
            return res.status(400).json("Bad request");

        if (!["smiley", "frowny", "surprised", "confused"].includes(type))
            return res.status(400).json("Bad request");

        const activity = await getActivityById(activityId);
        if (!activity) return res.status(400).json("Bad request");

        if (activity.accessCode !== accessCode)
            return res.status(400).json("Bad request");

        const feedback = await createFeedback(activityId, type);

        return res.status(200).json(feedback);
    });

feedbackController
    .route("/getFeedback")
    .get(authorizeTeacher, async (req, res) => {
        let { activityId } = req.body;

        if (!activityId) activityId = req.query.activityId;

        if (!activityId) return res.status(400).json("Bad request");

        return res.status(200).json({
            activities: await getFeedbackByActivityId(activityId),
            counts: await getFeedbackCountByActvityId(activityId),
        });
    });
