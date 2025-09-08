import React from "react";
import RoomsNavbar from "../../../Components/Rooms/RoomsNavbar";
import RoomsFooter from "../../../Components/Rooms/RoomsFooter";
import "./Rooms.css";

const Aboutus = () => {
  return (
    <div>
      <RoomsNavbar />
      
      <div className="aboutus-container">
        <h2>About Ivana Homestay</h2>
        <p className="aboutus-intro">
          At Ivana Homestay, we provide a warm and welcoming environment where guests 
          can enjoy modern comforts blended with authentic Sri Lankan hospitality. 
          Whether you are here for a short stay or a family vacation, our homestay 
          ensures comfort, relaxation, and memorable experiences.
        </p>

        <div className="aboutus-grid">
          <div className="aboutus-card">
            <h3>🏡 Our Mission</h3>
            <p>To provide cozy, affordable, and welcoming rooms that make our guests feel at home.</p>
          </div>

          <div className="aboutus-card">
            <h3>🌍 Our Vision</h3>
            <p>To be recognized as a top choice for travelers seeking authentic and comfortable homestay experiences in Jaffna.</p>
          </div>

          <div className="aboutus-card">
            <h3>✨ Why Choose Us?</h3>
            <ul>
              <li>Comfortable rooms</li>
              <li>Delicious homemade food</li>
              <li>Easy booking process</li>
              <li>Friendly customer service</li>
            </ul>
          </div>
        </div>
      </div>

      <RoomsFooter />
    </div>
  );
};

export default Aboutus;
