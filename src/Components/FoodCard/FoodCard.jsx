import React from "react";
import "./FoodCard.css"; // Assuming you have a CSS file for styling
import foodImage from "../../assets/nasikottu.jpg"; // Replace with your actual image path
function FoodCard() {
  return (
    <>
      <div className="food-card">
        <img src={foodImage} alt="Food Item" className="food-image" />
        <div className="food-details">
          <h3 className="food-title">Food Item Name</h3>
          {/* <p className="food-description">
            A brief description of the food item goes here.
          </p>
          <span className="food-price">$10.00</span> */}
        </div>
      </div>
    </>
  );
}

export default FoodCard;
