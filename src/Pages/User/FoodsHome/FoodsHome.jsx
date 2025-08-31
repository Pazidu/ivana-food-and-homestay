import React from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import ContactUs from "../../../Components/ContactUs/ContactUs"; // Assuming you have a ContactUs component
import "./FoodsHome.css"; // Assuming you have a CSS file for styling
import Slidebar from "../../../Components/Slidebar/Slidebar";
import SpecialCard from "../../../Components/SpecialCard/SpecialCard";
import basmathi from "../../../assets/basmathi.jpg"; // Replace with your actual image path
import quality from "../../../assets/quality.jpg"; // Replace with your actual image path
import delivery from "../../../assets/delivery.png"; // Replace with your actual image path
import nasikottu from "../../../assets/nasikottu.jpg"; // Replace with your actual image path
import longfood from "../../../assets/long-food.jpg"; // Replace with your actual image path
import DeliveryIamge from "../../../assets/Delivery_image.png"; // Replace with your actual image path
import uber from "../../../assets/uber.png"; // Replace with your actual image path
import pickme from "../../../assets/pickme.png"; // Replace with your actual image path
import { Link } from "react-router-dom";

function FoodsHome() {
  return (
    <div className="home">
      <Navbar name="Pasindu" />

      <div className="special">
        <div className="foodsHomeContainer">
          <Slidebar />
          <h1 className="specialText">Why We are Special ?</h1>
          <div className="specialItems">
            <SpecialCard
              imagelink={basmathi}
              topic={
                "Only basmathi rice Only basmathi rice Only basmathi rice Only basmathi rice Only basmathi rice Only basmathi rice Only basmathi rice Only basmathi rice"
              }
            />
            <SpecialCard
              imagelink={quality}
              topic={
                "Quality Ingredents Quality Ingredents Quality Ingredents Quality Ingredents Quality Ingredents Quality Ingredents Quality Ingredents Quality Ingredents"
              }
            />
            <SpecialCard
              imagelink={delivery}
              topic={
                "Door step delivery Door step delivery Door step delivery Door step delivery Door step delivery Door step delivery Door step delivery Door step delivery"
              }
            />
          </div>
        </div>
      </div>
      <div className="nasiKottu">
        <div className="kottuimage">
          <img src={nasikottu} alt="" />
        </div>
        <div className="kottuText">
          <h1>Nasik Kottu</h1>
          <p className="kottuDescription">
            Nasik Kottu is a traditional South Indian dish made with finely
            chopped vegetables, spices, and rice, often served with a variety of
            chutneys.Nasik Kottu is a traditional South Indian dish made with
            finely chopped vegetables, spices, and rice, often served with a
            variety of chutneys.Nasik Kottu is a traditional South Indian dish
            made with finely chopped vegetables, spices, and rice, often served
            with a variety of chutneys.
          </p>
          <button className="kottuButton">Order Now</button>
        </div>
      </div>
      <div className="ordernowbar">
        <img src={longfood} alt="" className="longimage" />
        <h1 className="orderText">Order Your Favorite Food Now</h1>

        <button className="orderButton">
          <Link
            to="/foods/menu"
            className="text-decoration-none z-100 text-black"
          >
            Order Now
          </Link>
        </button>
      </div>

      <div className="deliveryPart">
        <div className="deliveryBody">
          <h3>Get your foods delivered to your doorstep</h3>
          <h1>ORDER NOW</h1>
          <h3>via</h3>
          <div className="deliverytypes">
            <img src={uber} alt="" className="dtypes" />
            <img src={pickme} alt="" className="dtypes" />
          </div>
        </div>
        <div className="deliveryImage">
          <img src={DeliveryIamge} alt="" />
        </div>
      </div>

      <div className="contactNoBar">
        <h2 className="contactText">Call Us</h2>
        <p className="contactDescription">To get your takeaway ready</p>
        <button className="contactButton">+94 123 456 789</button>
      </div>

      <ContactUs />
      <Footer />
    </div>
  );
}

export default FoodsHome;
