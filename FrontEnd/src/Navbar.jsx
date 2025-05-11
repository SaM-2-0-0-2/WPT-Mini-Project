import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./assets/navbar.css";
import { getFname, clearUserData } from "./utils/UserData.jsx"; // Adjust path if needed

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();

    const fname = getFname();
    const isLoggedIn = !!fname;

    // Hide login/logout buttons on login/register page
    const hideAuthButton = location.pathname === "/login" || location.pathname === "/register";

    const handleLogout = () => {
        clearUserData();
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary ps-3 pe-3" style={{ opacity: 0.9 }}>
            <Link className="navbar-brand" to="/home">IOAH Mumbai</Link>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-3 fs-5">
                    <li className="nav-item">
                        <Link className="nav-link text-hover" to="/home">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-hover" to="/events">Events</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle text-hover" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            About
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><Link className="dropdown-item" to="/aboutUs">About IOAH</Link></li>
                            <li><Link className="dropdown-item" to="/ourTeam">Our Team</Link></li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-hover" to="/contact">Contact Us</Link>
                    </li>
                </ul>

                {!hideAuthButton && (
                    <div className="d-flex align-items-center gap-2">
                        {isLoggedIn ? (
                            <>
                                <span className="text-white fw-semibold">Hi, {fname}</span>
                                <button className="btn btn-outline-light" onClick={handleLogout}>
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="btn btn-outline-light">Log In</Link>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
