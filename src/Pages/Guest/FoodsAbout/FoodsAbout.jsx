import React from "react";
import Footer from "../../../Components/Footer/Footer";
import Navbar from "../../../Components/Navbar/Navbar";

// import ivanaFront from "../../Assets/ivanaFront.jpg"; // Assuming you have an image in this path
import ivanaFront from "../../../assets/ivanaFront.jpg"; // Adjust the path as necessary
import "./FoodsAbout.css"; // Assuming you have a CSS file for styling
// import ContactUs from "../../Components/ContactUs/ContactUs";

import SpecialCard from "../../../Components/SpecialCard/SpecialCard";

function FoodsAbout() {
  return (
    <div className="aboutUS">
      <Navbar name="Login" />

      <div className="aboutContainer">
        <img src={ivanaFront} alt="" className="coverImg" />
        <div className="imageOverlayText">
          <h2>Ivana Food Court</h2>
          <br />
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into
          </p>
        </div>
      </div>

      {/* <ContactUs /> */}
      <Footer />
    </div>
  );
}

export default FoodsAbout;
