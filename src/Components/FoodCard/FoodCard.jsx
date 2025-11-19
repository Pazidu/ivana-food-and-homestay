import React from "react";
import "./FoodCard.css";
function FoodCard(props) {
  return (
    <>
      <div className="food-card">
        <img src={props.foodImage} alt="Food image" className="food-image" />
        <div className="food-details">
          <h3 className="food-title">{props.name}</h3>
        </div>
      </div>
    </>
  );
}

export default FoodCard;
