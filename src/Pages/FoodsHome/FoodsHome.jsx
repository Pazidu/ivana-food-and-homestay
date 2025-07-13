import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import ContactUs from "../../Components/ContactUs/ContactUs"; // Assuming you have a ContactUs component
import "./FoodsHome.css"; // Assuming you have a CSS file for styling
import FoodCard from "../../Components/FoodCard/FoodCard";
import Slidebar from "../../Components/Slidebar/Slidebar";
import SpecialCard from "../../Components/SpecialCard/SpecialCard";
import basmathi from "../../assets/basmathi.jpg"; // Replace with your actual image path
import quality from "../../assets/quality.jpg"; // Replace with your actual image path
import delivery from "../../assets/delivery.png"; // Replace with your actual image path

function FoodsHome() {
  return (
    <div className="home">
      <Navbar />

      <div className="foodsHomeContainer">
        <Slidebar />
        <h1 className="specialText">Why We are Special ?</h1>
        <div className="special">
          <SpecialCard imagelink={basmathi} topic={"Only basmathi rice"} />
          <SpecialCard imagelink={quality} topic={"Quality Ingredents"} />
          <SpecialCard imagelink={delivery} topic={"Door step delivery"} />
        </div>
        <ContactUs />
      </div>

      <Footer />
    </div>
  );
}

export default FoodsHome;
