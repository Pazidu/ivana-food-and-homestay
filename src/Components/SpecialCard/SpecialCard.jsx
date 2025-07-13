import React from "react";
import "./SpecialCard.css";

function SpecialCard(props) {
  return (
    <div>
      <div className="cardContainer">
        <img src={props.imagelink} alt="" />
        <span>{props.topic}</span>
      </div>
    </div>
  );
}

export default SpecialCard;
