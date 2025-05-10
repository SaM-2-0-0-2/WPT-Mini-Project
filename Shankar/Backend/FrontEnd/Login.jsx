import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/login", { email, password })
            .then(result => {
                if (result.data === "Success") {
                    navigate("/home");
                } else {
                    setShowModal(true);
                    setIsFadingOut(false);

                    setTimeout(() => {
                        setIsFadingOut(true);
                        setTimeout(() => setShowModal(false), 500);
                    }, 2500);
                }
            })
            .catch(err => console.log(err));
    };

    const closeModal = () => {
        setIsFadingOut(true);
        setTimeout(() => setShowModal(false), 500);
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2 className="text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label><strong>Email</strong></label>
                        <input
                            type="email"
                            className="form-control rounded-0"
                            placeholder="Enter Email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label><strong>Password</strong></label>
                        <input
                            type="password"
                            className="form-control rounded-0"
                            placeholder="Enter Password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Login
                    </button>
                </form>
                <p className="text-center">Already Have an Account</p>
                <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
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
                        <div className="modal-dialog" role="document" style={{ maxWidth: "400px" }}>
                            <div className="modal-content" style={{ backgroundColor: "#f8d7da", color: "#721c24" }}>
                                <div className="modal-header">
                                    <h5 className="modal-title fs-6">Login Failed</h5>
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
    );
}

export default Login;
