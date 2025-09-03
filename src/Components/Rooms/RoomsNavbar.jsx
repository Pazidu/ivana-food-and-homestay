// src/Components/Rooms/RoomsNavbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./RoomsNavbar.css";

const RoomsNavbar = () => {
  return (
    <nav className="rooms-navbar">
      <div className="logo">Ivana Homestay</div>
      <ul>
        <li><Link to="/rooms/home">Home</Link></li>
        <li><Link to="/rooms/booking">Booking</Link></li>
        <li><Link to="/rooms/gallery">Gallery</Link></li>
      </ul>
    </nav>
  );
};

export default RoomsNavbar;
