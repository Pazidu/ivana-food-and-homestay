import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RoomsNavbar.css";

const RoomsNavbar = () => {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false); // profile dropdown
  const [menuOpen, setMenuOpen] = useState(false); // hamburger dropdown
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("user_type");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="rooms-navbar">
      {/* Logo */}
      <div className="logo">Ivana Homestay</div>

      {/* Hamburger (visible on mobile) */}
      <div
        className="hamburger"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Nav Links */}
      <ul className={menuOpen ? "show" : ""}>
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

      {/* Right Section (Login / User Dropdown) */}
      {!user ? (
        <Link to="/rooms/login">
          <button className="btn btn-outline-success" type="button">
            Login
          </button>
        </Link>
      ) : (
        <div className="user-dropdown">
          <button
            className="btn btn-outline-success"
            type="button"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            {user.username}
          </button>
          {showMenu && (
            <div className="dropdown-menu-custom">
              <button onClick={() => navigate("/user/profile")}>Profile</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default RoomsNavbar;
