import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RoomsNavbar.css";
import logo from "../../assets/logo.jpg";

const RoomsNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="rooms-navbar">
      <Link to="/" className="brand">
        <img src={logo} alt="Logo" className="brand-logo" />
        <span className="brand-text">Ivana Homestay</span>
      </Link>
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
        </ul>
      </div>{" "}
      <div className="hamburger" onClick={() => setMenuOpen((prev) => !prev)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default RoomsNavbar;
