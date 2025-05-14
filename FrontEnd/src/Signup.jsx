import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setFname, setEmail } from "./utils/UserData";
import Navbar from "./Navbar";
import "./components/styles/loginsignup.css";

function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [fname, setFnameState] = useState("");
    const [email, setEmailState] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const confirmPasswordRef = useRef(null);
    const PasswordRef = useRef(null);
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [successModal, setSuccessModal] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = true;
        // Add password validation regex
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

        // Inside handleSubmit function, add this password validation check:

        if (!password) {
            setPasswordError("Please fill out this field.");
            isValid = false;
        } else {
            setPasswordError("");
        }

        if (!passwordRegex.test(password)) {
            setPasswordError("Password must be at least 8 characters long, contain a lowercase letter, an uppercase letter, and a special character.");
            isValid = false;
        } else {
            setPasswordError("");
        }


        // Validate confirm password
        if (!confirmPassword) {
            setConfirmPasswordError("Please fill out this field.");
            isValid = false;
        } else if (confirmPassword !== password) {
            setConfirmPasswordError("Passwords do not match.");
            isValid = false;
        } else {
            setConfirmPasswordError("");
        }

        if (!isValid) return;

        // Proceed with registration
        axios.post("http://localhost:3000/register", { fname, email, password })
            .then(result => {
                if (result.data.message === "Registration successful") {
                    setFname(fname);
                    setEmail(email);
                    showSuccessModal();
                } else {
                    showErrorModal();
                }
            })
            .catch(() => {
                showErrorModal();
            });
    };

    const showErrorModal = () => {
        setSuccessModal(false);
        setIsFadingOut(false);
        setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => setSuccessModal(false), 500);
        }, 2500);
    };

    const showSuccessModal = () => {
        setSuccessModal(true);
        setIsFadingOut(false);
        setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => {
                setSuccessModal(false);
                navigate("/login");
            }, 500);
        }, 1500);
    };

    return (
        <div>
            <Navbar />
            <div className="body2 container-fluid d-flex justify-content-center align-items-center">
                <div className="form-container col-11 col-sm-7 col-md-6 col-lg-5 col-xl-4 p-4 rounded shadow">
                    <h2 className="text-center">Register</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Full Name */}
                        <div className="mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="ms-1 mb-1 bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                            </svg>
                            <label className="ms-2 fs-5" htmlFor="fname">Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter your Name"
                                autoComplete="off"
                                name="fname"
                                className="input1 form-control fs-5"
                                onChange={(e) => setFnameState(e.target.value)}
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-envelope-fill ms-1 mb-1" viewBox="0 0 16 16">
                                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                            </svg>
                            <label className="ms-2 fs-5" htmlFor="email">Email</label>
                            <input
                                type="email"
                                placeholder="Enter Email"
                                autoComplete="off"
                                name="email"
                                className="input1 form-control fs-5"
                                onChange={(e) => setEmailState(e.target.value)}
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-3 mt-3 position-relative">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="ms-1 mb-1 bi bi-key-fill" viewBox="0 0 16 16">
                                <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2" />
                            </svg>
                            <label className="ms-2 fs-5" htmlFor="password">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter Password"
                                autoComplete="off"
                                name="password"
                                className="input1 form-control fs-5"
                                onChange={(e) => {
                                    const password = e.target.value;
                                    setPassword(password);

                                    // Check individual password conditions
                                    let errorMessage = "";

                                    // Check for minimum length
                                    if (password.length < 8) {
                                        errorMessage = "Password must be at least 8 characters long.";
                                    }
                                    // Check for lowercase letter
                                    else if (!/[a-z]/.test(password)) {
                                        errorMessage = "Password must contain at least one lowercase letter.";
                                    }
                                    // Check for uppercase letter
                                    else if (!/[A-Z]/.test(password)) {
                                        errorMessage = "Password must contain at least one uppercase letter.";
                                    }
                                    // Check for special character
                                    else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
                                        errorMessage = "Password must contain at least one special character.";
                                    }

                                    // Set the custom validity message based on the error
                                    if (errorMessage) {
                                        PasswordRef.current.setCustomValidity(errorMessage);
                                    } else {
                                        PasswordRef.current.setCustomValidity("");  // Clear any error if all conditions are met
                                    }
                                }}

                                onInput={(e) => e.target.setCustomValidity("")}
                                value={password}
                                ref={PasswordRef}
                                required
                            />
                            <span
                                className="position-absolute end-0"
                                style={{ top: "70%", transform: "translateY(-50%)", cursor: "pointer", paddingRight: "0.75rem" }}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
                                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                                        <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                    </svg>
                                )}
                            </span>
                        </div>

                        {/* Confirm Password */}
                        <div className="mb-3 mt-3 position-relative">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="ms-1 mb-1 bi bi-key-fill" viewBox="0 0 16 16">
                                <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2" />
                            </svg>
                            <label className="ms-2 fs-5" htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                autoComplete="off"
                                name="confirmPassword"
                                className="input1 form-control fs-5"
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    if (e.target.value !== password) {
                                        confirmPasswordRef.current.setCustomValidity("Passwords do not match.");
                                    } else {
                                        confirmPasswordRef.current.setCustomValidity("");
                                    }
                                }}
                                onInput={(e) => e.target.setCustomValidity("")}
                                value={confirmPassword}
                                ref={confirmPasswordRef}
                                required
                            />
                            <span
                                className="position-absolute end-0"
                                style={{ top: "70%", transform: "translateY(-50%)", cursor: "pointer", paddingRight: "0.75rem" }}
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
                                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                                        <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                    </svg>
                                )}
                            </span>

                        </div>
                        <div className="text-center">
                            <button type="submit" className="signup-button w-75 mt-3 mb-2 fs-5">
                                Register
                            </button>
                        </div>
                    </form>
                    <div className="para1 text-center">
                        <p className="mt-1" style={{ color: "alicewhite", fontSize: "18px" }}>
                            Already have an account?{" "}
                            <Link to="/login" className="login-text">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {successModal && (
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
                    <div className="modal-dialog" role="document" style={{ maxWidth: "400px" }}>
                        <div className="modal-content" style={{ backgroundColor: "lightgreen", color: "black" }}>
                            <div className="modal-body">
                                <h5 className="modal-title fs-6">Registration Successful!</h5>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Signup;
