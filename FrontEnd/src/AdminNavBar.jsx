import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./assets/navbar.css";
import { getAdminName, clearAdminData } from "./utils/UserData.jsx"; // Adjust path if needed

function AdminNavbar() {
    const location = useLocation();
    const navigate = useNavigate();

    const fname = getAdminName();
    const isLoggedIn = !!fname;


    const handleLogout = () => {
        clearAdminData();
        navigate("/admin/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success ps-3 pe-3" style={{ opacity: 0.9 }}>
            <Link className="navbar-brand" to="/admin/event">IOAH Mumbai - Admin Portal</Link>
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
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle text-hover" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Manage Events
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><Link className="dropdown-item" to="/admin/addevent">Add Event</Link></li>
                            <li><Link className="dropdown-item" to="/admin/events">All Events</Link></li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-hover" to="/admin/query">Client Queries</Link>
                    </li>
                </ul>
                <button className="btn btn-outline-light" onClick={handleLogout}>
                    Log Out
                </button>
            </div>
        </nav>
    );
}

export default AdminNavbar;
