import React, { useState } from "react";
import { API } from "../constants";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("student"); // Add userType state
    const [success, setSuccess] = useState(null);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleUserTypeChange = (e) => {
        setType(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform login logic here
        fetch(API + "/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password, type }), // Include userType in the request body
        })
            .then((response) => response.json())
            .then((data) => {
                if (!data.token) {
                    setSuccess(false);
                    return;
                }
                setSuccess(true);

                // Save data to localStorage
                localStorage.setItem("userData", JSON.stringify(data));

                // Redirect to home page
                window.location.href = "/";
            });
    };

    return (
        <div>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <label style={{ marginBottom: "10px" }}>
                    Username:
                    <br />
                    <input
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        style={{
                            padding: "5px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                        }}
                    />
                </label>
                <br />

                <label style={{ marginBottom: "10px" }}>
                    Password:
                    <br />
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        style={{
                            padding: "5px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                        }}
                    />
                </label>

                <label style={{ marginBottom: "10px" }}>
                    User Type: {/* Add radio input for user type */}
                    <br />
                    <label>
                        <input
                            type="radio"
                            value="student"
                            checked={type === "student"}
                            onChange={handleUserTypeChange}
                        />
                        Student
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="teacher"
                            checked={type === "teacher"}
                            onChange={handleUserTypeChange}
                        />
                        Teacher
                    </label>
                </label>
                <br />

                {success === false ? (
                    <div style={{ color: "red", marginBottom: "10px" }}>
                        Something went wrong.
                    </div>
                ) : null}
                <button
                    type="submit"
                    style={{
                        padding: "5px 10px",
                        borderRadius: "5px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                    }}
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
