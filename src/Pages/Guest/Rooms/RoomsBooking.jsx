import React from "react";
import RoomsNavbar from "../../../Components/Rooms/RoomsNavbar";
import RoomsFooter from "../../../Components/Rooms/RoomsFooter";
import "./RoomsBooking.css";

const RoomsBooking = () => {
  return (
    <div>
      <RoomsNavbar />

      {/* Hero Section */}
      <section className="booking-hero">
        <div className="hero-overlay">
          <h1>Book Your Stay at Ivana Homestay</h1>
          <p>Comfortable rooms, warm hospitality, and unforgettable memories</p>
        </div>
      </section>

      {/* Availability Form */}
      <section className="booking-form">
        <h2>Check Availability</h2>
        <form>
          <input type="date" placeholder="Check-in" />
          <input type="date" placeholder="Check-out" />
          <select>
            <option>1 Guest</option>
            <option>2 Guests</option>
            <option>3 Guests</option>
            <option>4+ Guests</option>
          </select>
          <button type="submit">Search</button>
        </form>
      </section>

      {/* Rooms Section */}
      <section className="rooms-list">
        <h2>Our Rooms</h2>
        <div className="rooms-grid">
          {/* Room Card 1 */}
          <div className="room-card">
            <img src="/images/room1.jpg" alt="Deluxe Room" />
            <h3>Deluxe Room</h3>
            <p>Spacious room with modern facilities, AC, and balcony view.</p>
            <span className="price">LKR 8,000 / night</span>
            <button className="book-btn">Book Now</button>
          </div>

          {/* Room Card 2 */}
          <div className="room-card">
            <img src="/images/room2.jpg" alt="Family Suite" />
            <h3>Family Suite</h3>
            <p>Perfect for families, includes two bedrooms and a living area.</p>
            <span className="price">LKR 12,500 / night</span>
            <button className="book-btn">Book Now</button>
          </div>

          {/* Room Card 3 */}
          <div className="room-card">
            <img src="/images/room3.jpg" alt="Standard Room" />
            <h3>Standard Room</h3>
            <p>Affordable and cozy with all basic amenities included.</p>
            <span className="price">LKR 5,500 / night</span>
            <button className="book-btn">Book Now</button>
          </div>
        </div>
      </section>

      <RoomsFooter />
    </div>
  );
};

export default RoomsBooking;
