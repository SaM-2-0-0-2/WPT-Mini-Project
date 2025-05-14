import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar";
import { setFname, setEmail } from "./utils/UserData";
import "./components/styles/loginsignup.css";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
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
                    setFname(fname);
                    setEmail(email);
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
            <div className="body3 container-fluid vh-100 d-flex justify-content-center align-items-center">
                <div className="form-container col-11 col-sm-7 col-md-6 col-lg-4 col-xl-3 p-4 rounded shadow">
                    <h2 className="text-center mb-4 fs-2">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-envelope-fill ms-1 mb-2" viewBox="0 0 16 16">
                                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                            </svg>
                            <label className="ms-2 fs-4">Email</label>
                            <input
                                type="email"
                                className="input1 form-control rounded-1 fs-5"
                                placeholder="Enter your Email"
                                required
                                onChange={(e) => setEmailState(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 position-relative">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="ms-1 mb-2 bi bi-key-fill" viewBox="0 0 16 16">
                                <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2" />
                            </svg>
                            <label className="ms-2 fs-4">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="input1 form-control rounded-1 fs-5"
                                placeholder="Enter a Password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span
                                className="position-absolute end-0"
                                style={{ top: "70%", transform: "translateY(-50%)", cursor: "pointer", paddingRight: "0.75rem" }}
                                onClick={() => setShowPassword(!showPassword)}                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                                        <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                    </svg>
                                )}
                            </span>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="login-button w-50 mt-2">
                                Login
                            </button>
                        </div>
                    </form>

                    <p className="text-center mt-3 para1 fs-5">Don't have an account?
                        <Link to="/register" className="login-text rounded-1 ms-2">
                            Register
                        </Link></p>

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
