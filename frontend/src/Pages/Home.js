import { useState, useEffect } from "react";
import { API } from "../constants";

export const Home = (props) => {
    const userData = props.userData;
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        if (userData?.type === "teacher") {
            fetch(API + "/getActivities", {
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    // Process the fetched data here
                    console.log(data);
                    setActivities(data); // Save activities in the state
                })
                .catch((error) => {
                    console.error("Error fetching activities:", error);
                });
        }
    }, [userData]);

    return (
        <div>
            <h1>Home</h1>
            {/* Render activities here */}
            {activities.map((activity) => (
                <div className="activityCard" key={activity.id}>
                    <div className="activityId">Activity ID: {activity.id}</div>
                    <div className="activityDescription">
                        {activity.description}
                    </div>
                    <span className="activityAccessCode">
                        Access Code: {activity.accessCode}
                    </span>
                    {" | "}
                    <span className="activityDate">
                        Date:{" "}
                        {new Date(activity.date).toLocaleDateString() +
                            " " +
                            new Date(activity.date).toLocaleTimeString()}
                    </span>
                    {" | "}
                    <span className="activityDuration">
                        Duration: {activity.duration} minutes
                    </span>
                </div>
            ))}
        </div>
    );
};
