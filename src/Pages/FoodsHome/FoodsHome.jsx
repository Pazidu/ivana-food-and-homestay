import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import ContactUs from "../../Components/ContactUs/ContactUs"; // Assuming you have a ContactUs component
import "./FoodsHome.css"; // Assuming you have a CSS file for styling
import FoodCard from "../../Components/FoodCard/FoodCard";

function FoodsHome() {
  return (
    <>
      <Navbar />
      <div className="foodsHomeContainer">
        <FoodCard />
        <ContactUs />
      </div>

      <Footer />
    </>
  );
}

export default FoodsHome;
