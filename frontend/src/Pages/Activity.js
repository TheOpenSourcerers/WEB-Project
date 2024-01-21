import React, { useEffect, useState } from "react";
import { API } from "../constants";

const Activity = (props) => {
    const [activityData, setActivityData] = useState(null);
    const [activityReactions, setActivityReactions] = useState(null);

    useEffect(() => {
        const { id, userData } = props;
        // Use the id from props here
        console.log("ID:", id);

        if (userData && id) {
            fetch(API + "/getActivityById?activityId=" + id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userData.token}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    // Handle the activity data here
                    console.log("Activity Data:", data);
                    setActivityData(data);
                })
                .catch((error) => {
                    // Handle any errors here
                    console.error("Error:", error);
                });

            setInterval(() => {
                fetch(API + "/getFeedback?activityId=" + id, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userData.token}`,
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        // Handle the activity data here
                        console.log("Activity Data:", data);
                        setActivityReactions(data);
                    })
                    .catch((error) => {
                        // Handle any errors here
                        console.error("Error:", error);
                    });
            }, 1000);
        }
    }, [props]);

    return (
        <div>
            <h1>Activity {activityData?.id || null}</h1>
            <p>{activityData?.description}</p>
            <p>
                Date:{" "}
                {new Date(activityData?.date).toLocaleDateString() +
                    " " +
                    new Date(activityData?.date).toLocaleTimeString()}
            </p>
            <p>Duration: {activityData?.duration} minutes</p>
            <p>AccesCode: {activityData?.accessCode}</p>

            <h2>Reactions</h2>
            <div>
                <span>
                    😊 Smiley: {activityReactions?.counts?.smileyCount || 0}
                </span>
                {" | "}
                <span>
                    🙁 Frowny: {activityReactions?.counts?.frownyCount || 0}
                </span>
                {" | "}
                <span>
                    😯 Surprised:{" "}
                    {activityReactions?.counts?.surprisedCount || 0}
                </span>
                {" | "}
                <span>
                    😕 Confused: {activityReactions?.counts?.confusedCount || 0}
                </span>
            </div>
        </div>
    );
};

export default Activity;
