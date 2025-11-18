import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RoomsNavbar.css";
import logo from "../../assets/logo.jpg";

const RoomsNavbar = () => {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false); // profile dropdown
  const [menuOpen, setMenuOpen] = useState(false); // hamburger
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (token && username) setUser({ username });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("user_type");
    setUser(null);
    navigate("/rooms/login");
  };

  return (
    <nav className="rooms-navbar">
      {/* ===== Left: Brand ===== */}
      <Link to="/" className="brand">
        <img src={logo} alt="Logo" className="brand-logo" />
        <span className="brand-text">Ivana Homestay</span>
      </Link>

      {/* ===== Middle: Links ===== */}
      <div className="nav-links-wrapper">
        <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
          <li>
            <Link to="/rooms/home" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/rooms/booking" onClick={() => setMenuOpen(false)}>
              Booking
            </Link>
          </li>
          <li>
            <Link to="/rooms/gallery" onClick={() => setMenuOpen(false)}>
              Gallery
            </Link>
          </li>
          <li>
            <Link to="/rooms/aboutus" onClick={() => setMenuOpen(false)}>
              About us
            </Link>
          </li>
        </ul>
      </div>

      {/* ===== Right: Auth Buttons ===== */}
      <div className="auth-section">
        {!user ? (
          <Link to="/rooms/login">
            <button className="btn login-btn">Login</button>
          </Link>
        ) : (
          <div className="user-dropdown">
            <button
              className="btn user-btn"
              onClick={() => setShowMenu((prev) => !prev)}
            >
              {user.username}
            </button>
            {showMenu && (
              <div className="dropdown-menu">
                <button onClick={() => navigate("/user/profile")}>
                  Profile
                </button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ===== Mobile Hamburger ===== */}
      <div className="hamburger" onClick={() => setMenuOpen((prev) => !prev)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default RoomsNavbar;
