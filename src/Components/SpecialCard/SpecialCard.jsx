import React from "react";
import "./SpecialCard.css";

function SpecialCard(props) {
  return (
    <div>
      <div className="cardContainer">
        <span>{props.topic}</span>
        <br />
        <img src={props.imagelink} alt="" />

        <p>{props.description}</p>
      </div>
    </div>
  );
}

export default SpecialCard;
