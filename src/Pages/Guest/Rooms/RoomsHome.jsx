import React from "react";
import RoomsNavbar from "../../../Components/Rooms/RoomsNavbar";
import "./Rooms.css";

const RoomsHome = () => {
  return (
    <div>
      <RoomsNavbar />
      <div className="rooms-home">
        <h1>Welcome to Ivana Homestay</h1>
        <p>Choose from our cozy rooms and enjoy your stay.</p>
      </div>
    </div>
  );
};

export default RoomsHome;
