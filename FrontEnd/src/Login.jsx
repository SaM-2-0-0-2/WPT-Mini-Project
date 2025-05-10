import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar";
import { setFname, setEmail } from "./utils/UserData";

function Login() {
    const [email, setEmailState] = useState("");
    const [password, setPassword] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:3000/login", { email, password })
            .then(result => {
                const { message, token, fname } = result.data;

                if (message === "Login successful" && token) {
                    // Save to localStorage
                    localStorage.setItem("token", token);
                    setFname(fname);         // Save fname
                    setEmail(email);         // Save email
                    navigate("/home");
                } else {
                    showErrorModal();
                }
            })
            .catch(() => {
                showErrorModal();
            });
    };

    const showErrorModal = () => {
        setShowModal(true);
        setIsFadingOut(false);
        setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => setShowModal(false), 500);
        }, 2500);
    };

    return (
        <div>
            <Navbar />
            <div className="container-fluid bg-secondary vh-100 d-flex justify-content-center align-items-center">
                <div className="col-11 col-sm-7 col-md-6 col-lg-4 col-xl-3 bg-white p-4 rounded shadow">
                    <h2 className="text-center mb-4">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label><strong>Email</strong></label>
                            <input
                                type="email"
                                className="form-control rounded-1"
                                placeholder="Enter Email"
                                required
                                onChange={(e) => setEmailState(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label><strong>Password</strong></label>
                            <input
                                type="password"
                                className="form-control rounded-1"
                                placeholder="Enter Password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-success w-100 rounded-1">
                            Login
                        </button>
                    </form>

                    <p className="text-center mt-3">Don't have an account?</p>
                    <Link to="/register" className="btn btn-outline-secondary w-100 rounded-1">
                        Register
                    </Link>

                    {/* Modal */}
                    {showModal && (
                        <div
                            className={`modal fade ${!isFadingOut ? "show" : ""}`}
                            tabIndex="-1"
                            role="dialog"
                            style={{
                                display: "block",
                                opacity: isFadingOut ? 0 : 1,
                                transition: "opacity 0.5s ease-in-out",
                                backgroundColor: "rgba(0,0,0,0.5)"
                            }}
                        >
                            <div className="modal-dialog fs-9" role="document" style={{ maxWidth: "350px" }}>
                                <div className="modal-content" style={{ backgroundColor: "#f8d7da", color: "#721c24" }}>
                                    <div className="modal-header text-center">
                                        <h5 className="text-center modal-title fs-6">Login Failed</h5>
                                    </div>
                                    <div className="modal-body">
                                        <p className="text-center">Invalid email or password.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;
