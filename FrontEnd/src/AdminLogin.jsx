import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './components/styles/Admin.css'
import { setAdminName, setAdminEmail } from "./utils/UserData";

function AdminLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:3000/admin/login", { email, password })
            .then(result => {
                const { message, token, Username } = result.data;

                if (message === "Login successful" && token) {
                    // Save to localStorage
                    localStorage.setItem("token", token);
                    setAdminName(Username);         // Save fname
                    setAdminEmail(email);         // Save email
                    navigate("/admin/events");
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
        <div className="body1">
            <div className="row d-flex justify-content-center align-items-center vh-100">
                <div className="col-8 col-sm-6 col-md-5 col-lg-4 col-xl-3 transparent-container p-4" style={{ fontSize: "1rem" }}>
                    <h2 className="text-center">Admin Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 mt-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="mb-1 bi bi-envelope ms-1" viewBox="0 0 16 16">
                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                            </svg>
                            <label className="ms-2">Email</label>
                            <input
                                type="email"
                                className="input fs-6 form-control rounded-15"
                                placeholder="Enter Email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 mt-3 position-relative">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-lock ms-1 mb-1" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4M4.5 7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7zM8 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3" />
                            </svg>
                            <label className="ms-2">Password</label>
                            <div className="position-relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="input fs-6 form-control rounded-15 pe-5"
                                    placeholder="Enter Password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <span
                                    className="position-absolute end-0"
                                    style={{
                                        top: "40%",
                                        transform: "translateY(-50%)",
                                        cursor: "pointer",
                                        paddingRight: "0.75rem"
                                    }}
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >


                                    {showPassword ? (
                                        // Eye-slash icon
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                                            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                                            <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                                        </svg>
                                    ) : (
                                        // Eye icon
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                        </svg>
                                    )}
                                </span>
                            </div>
                        </div>
                        <div className="text-center mt-5 mb-2">
                            <button type="submit" className="button1 btn">Login</button>
                        </div>
                    </form>
                </div>
                {/* Error Modal */}
                {showModal && (
                    <div className="modal fade show" role="dialog" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
                        <div className="modal-dialog modal-sm " role="document">
                            <div className="modal-content" style={{ backgroundColor: "#f8d7da", color: "#721c24" }}>
                                <div className="modal-header">
                                    <h5 className="modal-title fs-6">Login Failed</h5>
                                </div>
                                <div className="modal-body">
                                    <p className="text-center">Incorrect email or password.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminLogin;