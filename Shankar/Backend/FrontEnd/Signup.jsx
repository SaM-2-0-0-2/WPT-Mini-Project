import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Signup() {
    const [fname, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/register", { fname, email, password })
            .then(result => {
                setShowSuccessModal(true);
                setShowErrorModal(false);
                setIsFadingOut(false);

                setTimeout(() => {
                    setIsFadingOut(true);
                    setTimeout(() => setShowSuccessModal(false), 500);
                }, 2500);
            })
            .catch(err => {
                setShowErrorModal(true);
                setShowSuccessModal(false);
                setIsFadingOut(false);

                setTimeout(() => {
                    setIsFadingOut(true);
                    setTimeout(() => setShowErrorModal(false), 500);
                }, 2500);
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2 className="text-center">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label><strong>Full Name</strong></label>
                        <input
                            type="text"
                            placeholder="Enter your Name"
                            autoComplete="off"
                            className="form-control rounded-0"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label><strong>Email</strong></label>
                        <input
                            type="text"
                            placeholder="Enter Email"
                            autoComplete="off"
                            className="form-control rounded-0"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label><strong>Password</strong></label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            autoComplete="off"
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">Register</button>
                </form>
                <p className="text-center">Already Have an Account?</p>
                <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Login</Link>

                {/* Success Modal */}
                {showSuccessModal && (
                    <div
                        className={`modal fade ${!isFadingOut ? "show" : ""}`}
                        tabIndex="-1"
                        role="dialog"
                        style={{ display: "block", opacity: isFadingOut ? 0 : 1, transition: "opacity 0.5s ease-in-out", backgroundColor: "rgba(0,0,0,0.5)" }}
                    >
                        <div className="modal-dialog" role="document" style={{ maxWidth: "400px" }}>
                            <div className="modal-content" style={{ backgroundColor: "#d4edda", color: "#155724" }}>
                                <div className="modal-header">
                                    <h5 className="modal-title fs-6">Registration Successful</h5>
                                </div>
                                <div className="modal-body">
                                    <p className="text-center">You have been successfully registered!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Error Modal */}
                {showErrorModal && (
                    <div
                        className={`modal fade ${!isFadingOut ? "show" : ""}`}
                        tabIndex="-1"
                        role="dialog"
                        style={{ display: "block", opacity: isFadingOut ? 0 : 1, transition: "opacity 0.5s ease-in-out", backgroundColor: "rgba(0,0,0,0.5)" }}
                    >
                        <div className="modal-dialog" role="document" style={{ maxWidth: "400px" }}>
                            <div className="modal-content" style={{ backgroundColor: "#f8d7da", color: "#721c24" }}>
                                <div className="modal-header">
                                    <h5 className="modal-title fs-6">Registration Failed</h5>
                                </div>
                                <div className="modal-body">
                                    <p className="text-center">Error registering. Please try again!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Signup;