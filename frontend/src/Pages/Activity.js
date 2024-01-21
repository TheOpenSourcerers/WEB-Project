import React, { useEffect, useState } from "react";
import { API } from "../constants";

const Activity = (props) => {
    const [activityData, setActivityData] = useState(null);

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
                })
                .catch((error) => {
                    // Handle any errors here
                    console.error("Error:", error);
                });
        }
    }, [props]);

    return (
        <div>
            <h1>Activity {activityData?.id || null}</h1>
            <p>Welcome to the activity page!</p>
        </div>
    );
};

export default Activity;
