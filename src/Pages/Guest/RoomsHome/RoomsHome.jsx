import React from "react";
import RoomsNavbar from "../../../Components/RoomsNavbar/RoomsNavbar";
import RoomsFooter from "../../../Components/RoomsFooter/RoomsFooter";
import room1 from "../../../assets/room1.jpg";
import room2 from "../../../assets/room2.jpg";
import room3 from "../../../assets/room3.jpg";
import room4 from "../../../assets/room4.jpg";
import room5 from "../../../assets/room5.jpg";
import room6 from "../../../assets/room6.jpg";

import "./RoomsHome.css";

const RoomsHome = () => {
  return (
    <div>
      <RoomsNavbar />

      {/* Hero Section */}
      <section className="rooms-hero">
        <div className="hero-overlay">
          <h1>Welcome to Ivana Homestay</h1>
          <p>Where comfort meets authentic Sri Lankan hospitality</p>
          <a href="/rooms/booking" className="hero-btn">
            Book Your Stay
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="rooms-features">
        <div className="feature-card">
          <span className="icon">🛏</span>
          <h3>Cozy Rooms</h3>
          <p>
            Relax in our clean, spacious, and air-conditioned rooms with all
            modern amenities.
          </p>
        </div>
        <div className="feature-card">
          <span className="icon">🍴</span>
          <h3>Delicious Meals</h3>
          <p>
            Enjoy authentic homemade Sri Lankan cuisine made with fresh, local
            ingredients.
          </p>
        </div>
        <div className="feature-card">
          <span className="icon">📲</span>
          <h3>Easy Booking</h3>
          <p>
            Reserve your stay effortlessly with our user-friendly online booking
            system.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="rooms-testimonials">
        <h2>What Our Guests Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p>
              "I tried a chicken koththu and a All meat Nasigoreng yesterday.
              ❤️"
            </p>
            <h4>- Singhe Silva</h4>
          </div>
          <div className="testimonial-card">
            <p>
              "Tucked within the vibrant hangout food court, Dragon's Den is a
              hidden gem that promises an unforgettable Chinese culinary
              experience. This takeaway outlet redefines fast food with its
              authentic flavors and modern twists on traditional recipes🐲"
            </p>
            <h4>- Kanishka Sandaruwan</h4>
          </div>
          <div className="testimonial-card">
            <p>
              "Awesome delicious food and very friendly owners. I will come back
              for sure."
            </p>
            <h4>- Hokushin Dojo Online</h4>
          </div>
        </div>
      </section>

      <section className="rooms-gallery-preview">
        <h2>Our Homestay</h2>
        <div className="gallery-grid">
          <img src={room1} alt="Room 1" />
          <img src={room2} alt="Room 2" />
          <img src={room3} alt="Room 3" />
          <img src={room4} alt="Room 4" />
          <img src={room5} alt="Room 5" />
          <img src={room6} alt="Room 6" />
        </div>
        <a href="/rooms/gallery" className="gallery-btn">
          View Full Gallery
        </a>
      </section>

      <section className="rooms-cta">
        <h2>Ready to Experience True Hospitality?</h2>
        <a href="/rooms/booking" className="cta-btn">
          Book Now
        </a>
      </section>

      <RoomsFooter />
    </div>
  );
};

export default RoomsHome;
