// src/Components/Rooms/Rooms.jsx
import React, { useState } from "react";
import "./Rooms.css";

const Rooms = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Details:", formData);
    alert("Your booking has been submitted!");
  };

  return (
    <div className="rooms-container">
      <h2>Book a Room</h2>
      <form onSubmit={handleSubmit} className="booking-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Check-in:</label>
        <input
          type="date"
          name="checkIn"
          value={formData.checkIn}
          onChange={handleChange}
          required
        />

        <label>Check-out:</label>
        <input
          type="date"
          name="checkOut"
          value={formData.checkOut}
          onChange={handleChange}
          required
        />

        <label>Guests:</label>
        <input
          type="number"
          name="guests"
          value={formData.guests}
          min="1"
          onChange={handleChange}
          required
        />

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default Rooms;
