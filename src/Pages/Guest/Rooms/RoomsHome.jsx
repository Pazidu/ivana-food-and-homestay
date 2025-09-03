import React from "react";
import { Link } from "react-router-dom";
import "./Rooms.css";

const RoomsHome = () => {
  return (
    <div className="rooms-home">
      <h1>Our Rooms</h1>
      <p>Choose from our comfortable homestay rooms.</p>
      <Link to="/rooms/booking" className="book-btn">Book Now</Link>
      <Link to="/rooms/gallery" className="gallery-btn">View Gallery</Link>
    </div>
  );
};

export default RoomsHome;
