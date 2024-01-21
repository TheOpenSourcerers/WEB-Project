import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import "./App.css";

const logout = () => {
    localStorage.removeItem("userData");
    window.location.href = "/";
};

function App() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("userData");
        if (token) {
            const decodedToken = JSON.parse(atob(token.split(".")[1]));
            setUserData(decodedToken);

            if (decodedToken.exp) {
                const expirationTime = decodedToken.exp * 1000 - Date.now();
                console.log(
                    "Logging out in",
                    Math.floor(expirationTime / 1000 / 60),
                    "minutes"
                );

                setTimeout(() => {
                    // Perform logout or token refresh logic here
                    setUserData(null);

                    logout();
                }, expirationTime);
            }
        }
    }, []);

    return (
        <div className="App">
            <div className="navbar">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {userData ? (
                        <>
                            <li>
                                <div className="username">
                                    {userData.type.charAt(0).toUpperCase() +
                                        userData.type.slice(1)}
                                    : {userData.username}
                                </div>
                            </li>
                            <li>
                                <div
                                    className="logoutButton"
                                    onClick={() => {
                                        logout();
                                    }}
                                >
                                    Logout
                                </div>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </div>
    );
}

export default App;
