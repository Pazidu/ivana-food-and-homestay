import React from "react";
import Footer from "../../../Components/Footer/Footer";
import Navbar from "../../../Components/Navbar/Navbar";
import "./FoodsAbout.css";

// Import your images
import founderImg from "../../../assets/user.png";
import chefImg from "../../../assets/chef.jpeg";
import heroImg from "../../../assets/ivanaFront.jpg";

function FoodsAbout() {
  return (
    <div className="aboutUS">
      <Navbar name="Login" />

      {/* Hero Section */}
      <div
        className="heroSection"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="heroText">
          <h1>Welcome to Ivana Food Court</h1>
          <p>
            Ivana Food Court is dedicated to serving authentic flavors with love
            and passion. Our mission is to create unforgettable dining
            experiences for everyone who walks through our doors. Enjoy a
            variety of dishes crafted from the finest ingredients, with care
            and attention to detail.
          </p>
        </div>
      </div>

      {/* Founder Section */}
      <section className="about-section">
        <h2>Founder</h2>
        <div className="about-card founder-card highlight">
          <img src={founderImg} alt="Founder" className="square-img founder-img" />
          <div className="card-text">
            <h3>Mr. Pavitha</h3>
            <p>Email: pavitha@ivana.com</p>
            <p>
              John started Ivana Food Court with a vision to bring authentic
              local and international flavors together in a warm and inviting
              environment.
            </p>
          </div>
        </div>
      </section>

      {/* Chef Section */}
      <section className="about-section">
        <h2>Our Chef</h2>
        <div className="about-card reverse">
          <img src={chefImg} alt="Chef" className="square-img" />
          <div className="card-text">
            <h3>Chef Santha</h3>
            <p>Master of Authentic Sri Lankan Cuisine</p>
            <p>
              With over 15 years of culinary expertise, Chef Maria crafts each
              dish with creativity, precision, and love for flavors.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="about-section">
        <h2>Contact & Location</h2>
        <div className="about-card contact-card">
          <div className="card-text">
            <p>📍 Kandy, Sri Lanka</p>
            <p>📞 +94 77 123 4567</p>
            <p>📧 info@ivanafood.com</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default FoodsAbout;
