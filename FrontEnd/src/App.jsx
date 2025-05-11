import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from "./Signup";
import Login from './Login';
import Navbar from "./Navbar";
import Home from "./Home";
import AboutUs from './About_Us';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import ContactUs from './ContactUs';
import AOS from 'aos';
import '../node_modules/aos/dist/aos.css';
import { useEffect } from "react";
import AdminLogin from "./AdminLogin";
import Ourteam from './Ourteam';
import Footer from './Footer';

// Layout wrapper to include Navbar conditionally
function AppLayout() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/admin/login";

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/ourteam" element={<Ourteam />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        {/* Add more routes here */}
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
