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

    const [newFeedback, setNewFeedback] = useState({
        activityId: "",
        accessCode: "",
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

    const handleFeedbackChange = (event) => {
        const { name, value } = event.target;
        setNewFeedback((prevFeedback) => ({
            ...prevFeedback,
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

    const reactToActivity = (e, type) => {
        e.preventDefault();
        const data = {
            activityId: newFeedback.activityId,
            accessCode: newFeedback.accessCode,
            type,
        };

        fetch(API + "/createFeedback", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${userData.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                // Process the fetched data here
                console.log(data);
            })
            .catch((error) => {
                console.error("Error creating feedback:", error);
                setSubmitError("Error creating feedback.");
            });
    };

    return (
        <div>
            <h1>
                {userData?.type === "teacher"
                    ? "Your activities"
                    : "React to activity"}
            </h1>
            {/* Give feedback here */}
            {userData?.type === "student" && (
                <>
                    <form className="activityForm">
                        <h2>Send feedback</h2>
                        <label>
                            Activity ID:
                            <input
                                type="number"
                                name="activityId"
                                value={newFeedback.activityId}
                                onChange={handleFeedbackChange}
                            />
                        </label>
                        <label>
                            Access Code:
                            <input
                                type="text"
                                name="accessCode"
                                value={newFeedback.accessCode}
                                onChange={handleFeedbackChange}
                            />
                        </label>

                        {submitError ? (
                            <label style={{ color: "red" }}>
                                {submitError}
                            </label>
                        ) : null}
                        <div>
                            <button
                                onClick={(e) => reactToActivity(e, "smiley")}
                            >
                                😊 Smiley
                            </button>
                            <button
                                onClick={(e) => reactToActivity(e, "frowny")}
                            >
                                🙁 Frowny
                            </button>
                            <button
                                onClick={(e) => reactToActivity(e, "surprised")}
                            >
                                😯 Surprised
                            </button>
                            <button
                                onClick={(e) => reactToActivity(e, "confused")}
                            >
                                😕 Confused
                            </button>
                        </div>
                    </form>
                </>
            )}
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
                        <h2>Create new activity</h2>
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
