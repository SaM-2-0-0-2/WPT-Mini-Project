import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFname, getEmail } from "./utils/UserData";
import "./assets/contact.css";

function ContactUs() {
    const fname = getFname();
    const email = getEmail();
    const [subject, setSubject] = useState("");
    const [query, setQuery] = useState("");
    
    const [errorModal, setErrorModal] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
        alert("Please log in to submit your query.");
        return;
    }

    try {
        const response = await axios.post("http://localhost:3000/query", { fname, email, subject, query });
        if (response.data.message === "Response sent successfully") {
                ShowSuccessModal();
                setSubject("");
                setQuery("");  
            }
        } catch (error) {
            ShowErrorModal("");
        }
    };

    const ShowErrorModal = () => {
        setErrorModal(true);
        setIsFadingOut(false);
        setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => setErrorModal(false), 500);
        }, 800);
    };
    
    const ShowSuccessModal = () => {
        setSuccessModal(true);
        setIsFadingOut(false);
        setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => setSuccessModal(false), 500);
        }, 1000);
    };

    useEffect(() => {
        if (fname && fname.trim() !== "") {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [fname]);

    useEffect(() => {
    const observerOptions = {
        root: null,
        threshold: [0, 0.1, 0.2], // Track multiple visibility levels
        rootMargin: "0px"
    };
    
    const elements = document.querySelectorAll(".fade-in-up, .fade-in-down");
    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const target = entry.target;
            if (entry.intersectionRatio > 0.1) {
                target.classList.add("visible");
            } else {
                target.classList.remove("visible");
            }
        });
    }, observerOptions);
    elements.forEach(el => observer.observe(el));

  return () => {
    elements.forEach(el => observer.unobserve(el));
  };
}, []);

    return (
        <div>
            <div className="contact-img d-flex justify-content-center align-items-center">
                <h1 className="text-center">Contact Us</h1>
            </div>

            <div className="container my-5">
                <div className="row d-flex align-items-stretch justify-content-center g-5">
                    {/* Contact Details */}
                    <div className="col-lg-6 col-md-10">
                        <div className="contact-details fade-in-down p-4 ">
                            <h2 className="text text-center mb-4">Contact Details</h2>
                            <div className="p-2">
                                    <h1 className="text fs-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                                        </svg>
                                    <span className="ms-3">Phone</span></h1>
                                <a className="paratext" href="tel:+919323123354"><p className="ps-5">+91 9323123354</p></a>
                            </div>

                            <div className="p-2">
                                 <h1 className="text fs-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-envelope-at-fill" viewBox="0 0 16 16">
                                        <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 9.671V4.697l-5.803 3.546.338.208A4.5 4.5 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671"/>
                                        <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791"/>
                                    </svg>
                                 <span className="ms-3">Email Us</span></h1>
                                <a className="paratext" href="mailto:iaohmumbai@gmail.com" target="_blank" rel="noopener noreferrer"><p className="ps-5">iaohmumbai@gmail.com</p></a>
                            </div>

                            <div className="p-2">
                                <h1 className="text fs-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                                </svg>
                                <span className="ms-3">Registered Address</span></h1>
                                <a className="paratext" href="https://maps.app.goo.gl/bs1HKfpTBFDH8fMr5" target="_blank" rel="noopener noreferrer">
                                    <p className="ps-5">Shop No 4, Krishna Kamal Apartments, Mithagar Road, Mulund East, Mumbai- 400081</p>
                                </a>
                            </div>

                            <div className="p-2">
                                <h1 className="text fs-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                                   <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                                   <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                </svg>
                                <span className="ms-3">Secretariat</span></h1>
                                <a className="paratext" href="https://maps.app.goo.gl/gQ9VU5vSDeJYzVAS7" target="_blank" rel="noopener noreferrer">
                                    <p className="ps-5">Dr.Neetika Chauhan A-903, Krishna Towers, Ashoknagar, Kandivali East, Mumbai - 400101</p>
                                </a>
                            </div>

                            <div className="icons text-center mt-4 mb-4">
                                <a className="icon" href="https://www.instagram.com/iaohindia/" target="_blank">
                                    <svg  xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                                    </svg>
                                </a>

                                 
                                <a className="linkedin-icon ms-3"  href="https://www.linkedin.com/company/indian-association-of-occupational-health-iaoh/" target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                                    </svg>
                                </a>

                                <a className="twitter-icon ms-3" href="https://x.com/iaoh_india" target="_blank">
                                    <svg  xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-twitter-x" viewBox="0 0 16 16">
                                        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Feedback Form */}
                    <div className="col-lg-6 col-md-10">
                        <div className="feedback-form fade-in-up p-4">
                            <h2 className="text-center mb-4">Write to Us</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="Full-Name" className="form-label">Full Name</label>
                                    <input value={fname} disabled className="form-control" placeholder="login to see your details" id="Full-Name" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Full-Name" className="form-label">Email</label>
                                    <input value={email} disabled className="form-control" placeholder="login to see your details" id="Full-Name" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Subject" className="form-label">Subject</label>
                                    <input type="text" value={subject} className="form-control" placeholder="Query Subject" id="Subject" onChange={(e) => setSubject(e.target.value)} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Query" className="form-label">Query</label>
                                    <textarea className="textarea form-control" id="Query" value={query} rows="5" onChange={(e) => setQuery(e.target.value)} placeholder="We are happy to resolve your query..." required></textarea>
                                </div>
                                <div className=" text-center mt-5 mb-4">
                                    <div className={`tooltip-wrapper ${!isLoggedIn ? "tooltip-active" : ""}`} data-tooltip="Please log in to submit your query.">
                                        <button
                                            type="submit"
                                            className="button btn btn-light px-4"
                                            disabled={!isLoggedIn}
                                        >Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
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
                    backgroundColor: "rgba(0,0,0,0.2)"
                }}
            >
                <div className="modal-dialog" role="document" style={{ maxWidth: "400px" }}>
                    <div className="modal-content" style={{ backgroundColor: "rgba(81, 251, 7, 0.82)", color: "black" }}>
                        <div className="modal-body">
                            <h5 className="modal-title fs-6">We will get back to you soon!</h5>
                        </div>
                    </div>
                </div>
            </div>
        )}
        {/* Modal */}
        {errorModal && (
            <div
                className={`modal fade ${!isFadingOut ? "show" : ""}`}
                tabIndex="-1"
                role="dialog"
                style={{
                    display: "block",
                    opacity: isFadingOut ? 0 : 1,
                    transition: "opacity 0.5s ease-in-out",
                    backgroundColor: "rgba(0,0,0,0.2)"
                }}
            >
                <div className="modal-dialog" role="document" style={{ maxWidth: "400px" }}>
                    <div className="modal-content" style={{ backgroundColor: "rgba(246, 12, 12, 0.881)", color: "black" }}>
                        <div className="modal-body">
                            <h5 className="text-center modal-title fs-6">Aw, Snap! Something went wrong.</h5>
                            <h5 className="text-center modal-title fs-6">Please try again later.</h5>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </div>
    );
}

export default ContactUs;
