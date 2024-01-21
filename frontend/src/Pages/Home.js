import { useState, useEffect } from "react";
import { API } from "../constants";

export const Home = (props) => {
    const userData = props.userData;
    const [activities, setActivities] = useState([]);
    const [submitError, setSubmitError] = useState("");
    const [newActivity, setNewActivity] = useState({
        date: "",
        duration: "",
        description: "",
    });

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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewActivity((prevActivity) => ({
            ...prevActivity,
            [name]: value,
        }));
    };

    const submitActivity = (e) => {
        e.preventDefault();
        // Validate the newActivity object
        if (
            !newActivity.date ||
            !newActivity.duration ||
            !newActivity.description
        ) {
            console.error("Invalid activity data");
            setSubmitError("Invalid activity data");
            return;
        }
        // the duration should be bigger than 1
        if (newActivity.duration < 1) {
            console.error("Invalid activity duration");
            setSubmitError("Invalid activity duration");
            return;
        }

        fetch(API + "/createActivity", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${userData.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newActivity),
        })
            .then((res) => res.json())
            .then((data) => {
                // Process the fetched data here
                console.log(data);
                setActivities([...activities, data]); // Save activities in the state
                setNewActivity({
                    date: "",
                    duration: "",
                    description: "",
                });
            })
            .catch((error) => {
                setSubmitError("Error creating activity.");
                console.error("Error creating activity:", error);
            });
    };

    return (
        <div>
            <h1>
                {userData?.type === "teacher"
                    ? "Your activities"
                    : "React to activity"}
            </h1>
            {/* Render activities here */}
            {userData?.type === "teacher" && (
                <>
                    {activities.map((activity) => (
                        <div
                            className="activityCard"
                            onClick={() =>
                                (window.location.href =
                                    "/activity?id=" + activity.id)
                            }
                            key={activity.id}
                        >
                            <div className="activityId">
                                Activity ID: {activity.id}
                            </div>
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
                                    new Date(
                                        activity.date
                                    ).toLocaleTimeString()}
                            </span>
                            {" | "}
                            <span className="activityDuration">
                                Duration: {activity.duration} minutes
                            </span>
                        </div>
                    ))}
                    <form className="activityForm">
                        <label>
                            Date and Time:
                            <br />
                            <input
                                type="datetime-local"
                                name="date"
                                value={newActivity.date}
                                onChange={handleInputChange}
                            />
                        </label>
                        <br />
                        <label>
                            Duration (minutes):
                            <br />
                            <input
                                min={1}
                                type="number"
                                name="duration"
                                value={newActivity.duration}
                                onChange={handleInputChange}
                            />
                        </label>
                        <br />
                        <label>
                            Description:
                            <br />
                            <textarea
                                name="description"
                                value={newActivity.description}
                                onChange={handleInputChange}
                            />
                        </label>
                        <br />
                        {submitError ? (
                            <label style={{ color: "red" }}>
                                {submitError}
                            </label>
                        ) : null}
                        <button onClick={submitActivity}>
                            Create new activity
                        </button>
                    </form>
                </>
            )}
        </div>
    );
};
