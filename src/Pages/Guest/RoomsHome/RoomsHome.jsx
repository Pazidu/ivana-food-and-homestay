import React from "react";
import RoomsNavbar from "../../../Components/RoomsNavbar/RoomsNavbar";
import RoomsFooter from "../../../Components/RoomsFooter/RoomsFooter";
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
              "Ivana Homestay was the perfect getaway! The rooms were spotless
              and the staff so friendly."
            </p>
            <h4>- Sarah M.</h4>
          </div>
          <div className="testimonial-card">
            <p>
              "The food was absolutely delicious and the hospitality unmatched.
              Highly recommend!"
            </p>
            <h4>- John D.</h4>
          </div>
          <div className="testimonial-card">
            <p>
              "Beautiful location, warm people, and cozy rooms. I’ll definitely
              come back again!"
            </p>
            <h4>- Priya S.</h4>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="rooms-gallery-preview">
        <h2>Our Homestay</h2>
        <div className="gallery-grid">
          <img src="/images/room1.jpg" alt="Room 1" />
          <img src="/images/room2.jpg" alt="Room 2" />
          <img src="/images/room3.jpg" alt="Room 3" />
        </div>
        <a href="/rooms/gallery" className="gallery-btn">
          View Full Gallery
        </a>
      </section>

      {/* Call To Action */}
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
