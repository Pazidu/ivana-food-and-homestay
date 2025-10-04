import React, { useEffect, useState } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import ContactUs from "../../../Components/ContactUs/ContactUs";
import "./FoodsHome.css";
import Slidebar from "../../../Components/Slidebar/Slidebar";
import SpecialCard from "../../../Components/SpecialCard/SpecialCard";

import basmathi from "../../../assets/basmathi.jpg";
import quality from "../../../assets/quality.jpg";
import delivery from "../../../assets/delivery.png";
import nasikottu from "../../../assets/nasikottu.jpg";
import SeafoodSpecialRice from "../../../assets/Seafood Special Rice.jpg";
import MeatAndSeafoodSpecialRicettu from "../../../assets/Meat & Seafood Special Rice.jpg";
import VegetableSpecialRice from "../../../assets/Vegetable Special Rice.jpg";
import MixMeatSpecialRice from "../../../assets/Mix Meat Special Rice.jpg";
import longfood from "../../../assets/long-food.jpg";
import DeliveryIamge from "../../../assets/Delivery_image.png";
import uber from "../../../assets/uber.png";
import pickme from "../../../assets/pickme.png";
import { Link } from "react-router-dom";

function FoodsHome() {
  // Slider Data
  const slides = [
    {
      title: "Ivana Vegetable Special Rice",
      description:
        "A healthy, flavorful mix of fresh vegetables and aromatic basmathi rice cooked to perfection.",
      image: VegetableSpecialRice,
      link: { topic: "Rice", subTopic: "Ivana Vegetable Special Rice" },
    },
    {
      title: "Ivana Mix Meat Special Rice",
      description:
        "An indulgent fusion of tender meats and spiced rice, bursting with rich flavors.",
      image: MixMeatSpecialRice,
      link: { topic: "Rice", subTopic: "Ivana Mix Meat Special Rice" },
    },
    {
      title: "Ivana Seafood Special Rice",
      description:
        "Fresh seafood combined with fragrant basmathi rice — a true taste of the coast.",
      image: SeafoodSpecialRice,
      link: { topic: "Rice", subTopic: "Ivana Seafood Special Rice" },
    },
    {
      title: "Ivana Mix Meat & Seafood Special Rice",
      description:
        "A grand combination of premium meats and seafood served over perfectly spiced rice.",
      image: MeatAndSeafoodSpecialRicettu,
      link: { topic: "Rice", subTopic: "Ivana Mix Meat & Seafood Special Rice" },
    },
    {
      title: "Nasi Kottu",
      description:
        "A South Indian classic with finely chopped veggies, flavorful spices, and rice — a local favorite!",
      image: nasikottu,
      link: { topic: "Kottu", subTopic: "Nasi Kottu" },
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Navigate manually
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="home">
      <Navbar />

      {/* Why We Are Special */}
      <div className="special">
        <div className="foodsHomeContainer">
          <Slidebar />
          <h1 className="specialText">Why We Are Special ?</h1>
          <div className="specialItems">
            <SpecialCard
              imagelink={basmathi}
              topic="Only Basmathi Rice"
              description="Our premium basmathi rice is sourced from trusted farms, cooked to perfection for fluffy, aromatic meals."
            />
            <SpecialCard
              imagelink={quality}
              topic="Quality Ingredients"
              description="We use only fresh, high-quality ingredients to ensure authentic flavors and a wholesome dining experience."
            />
            <SpecialCard
              imagelink={delivery}
              topic="Doorstep Delivery"
              description="Get your food delivered hot and fresh directly to your doorstep, maintaining taste and quality every time."
            />
          </div>
        </div>
      </div>

      {/* Food Slider Section */}
      <div className="food-slider">
        <button className="slide-nav left" onClick={prevSlide}>
          &#10094;
        </button>

        <div className="slider-image">
          <img src={slides[currentSlide].image} alt={slides[currentSlide].title} />
        </div>

        <div className="slider-text">
          <h1>{slides[currentSlide].title}</h1>
          <p>{slides[currentSlide].description}</p>
          <button className="slider-button">
            <Link
              to="/foods/menu"
              state={slides[currentSlide].link}
              className="text-decoration-none text-black"
            >
              Order Now
            </Link>
          </button>
        </div>

        <button className="slide-nav right" onClick={nextSlide}>
          &#10095;
        </button>
      </div>

      {/* Order Now Bar */}
      <div className="ordernowbar">
        <img src={longfood} alt="" className="longimage" />
        <h1 className="orderText">Order Your Favorite Food Now</h1>
        <button className="orderButton">
          <Link to="/foods/menu" className="text-decoration-none z-100 text-black">
            Order Now
          </Link>
        </button>
      </div>

      {/* Delivery Section */}
      <div className="deliveryPart">
        <div className="deliveryBody">
          <h3>Get your foods delivered to your doorstep</h3>
          <h1>ORDER NOW</h1>
          <h3>via</h3>
          <div className="deliverytypes">
            <a
              href="https://www.ubereats.com/lk/feed?diningMode=DELIVERY"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={uber} alt="Uber Eats" className="dtypes" />
            </a>
            <a href="https://pickme.lk/services/food/" target="_blank" rel="noopener noreferrer">
              <img src={pickme} alt="PickMe Food" className="dtypes" />
            </a>
          </div>
        </div>
        <div className="deliveryImage">
          <img src={DeliveryIamge} alt="Delivery" />
        </div>
      </div>

      {/* Contact Bar */}
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
