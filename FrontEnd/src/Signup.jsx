import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setFname, setEmail } from "./utils/UserData";
import Navbar from "./Navbar";

function Signup() {
    const [fname, setFnameState] = useState("");
    const [email, setEmailState] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:3000/register", { fname, email, password })
            .then(result => {
                if (result.data.message === "Registration successful") {
                    // Save the user's name and email in localStorage
                    setFname(fname);
                    setEmail(email);
                    showSuccessModal();
                } else {
                    showErrorModal();
                }
            })
            .catch(err => {
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

    const showSuccessModal = () => {
        setSuccessModal(true);
        setIsFadingOut(false);
        setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => {
                    setSuccessModal(false) 
                    navigate("/login")}, 500);
        }, 1500);
    };

    return (
        <div>
            <Navbar></Navbar>
            <div className="container-fluid bg-secondary vh-100 d-flex justify-content-center align-items-center">
                <div className="col-11 col-sm-7 col-md-6 col-lg-5 col-xl-3 bg-white p-4 rounded shadow">
                    <h2 className="text-center">Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="fname"><strong>Full Name</strong></label>
                            <input
                                type="text"
                                placeholder="Enter your Name"
                                autoComplete="off"
                                name="fname"
                                className="form-control rounded-0"
                                onChange={(e) => setFnameState(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email"><strong>Email</strong></label>
                            <input
                                type="email"
                                placeholder="Enter Email"
                                autoComplete="off"
                                name="email"
                                className="form-control rounded-0"
                                onChange={(e) => setEmailState(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password"><strong>Password</strong></label>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                autoComplete="off"
                                name="password"
                                className="form-control rounded-0"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-success w-100 rounded-0">
                            Register
                        </button>
                    </form>
                    <p className="text-center mt-2">Already have an account?</p>
                    <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                        Login
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
                        <div className="modal-dialog" role="document" style={{ maxWidth: "400px" }}>
                                <div className="modal-content" style={{ backgroundColor: "#f8d7da", color: "#721c24" }}>
                                    <div className="modal-header">
                                        <h5 className="modal-title fs-6">Registration Failed</h5>
                                    </div>
                                    <div>
                                        <p className="text-center">Could not register. Duplicate Email.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

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
            </div>
        </div>
    );
}

export default Signup;
