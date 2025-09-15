import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RoomsNavbar.css";

const RoomsNavbar = () => {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
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
      <div className="logo">Ivana Homestay</div>
      <ul>
        <li>
          <Link to="/rooms/home">Home</Link>
        </li>
        <li>
          <Link to="/rooms/booking">Booking</Link>
        </li>
        <li>
          <Link to="/rooms/gallery">Gallery</Link>
        </li>
        <li>
          <Link to="/rooms/aboutus">About us</Link>
        </li>
      </ul>
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
            onClick={() => setShowMenu((prev) => !prev)} // Toggle menu on click
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
