import React from "react";
import RoomsNavbar from "../../../Components/Rooms/RoomsNavbar";
import Rooms from "../../../Components/Rooms/Rooms";
import RoomsFooter from "../../../Components/Rooms/RoomsFooter";

const RoomsBooking = () => {
  return (
    <div>
      <RoomsNavbar />
      <Rooms />
      <RoomsFooter/>
    </div>
  );
};

export default RoomsBooking;
