import React from "react";
import RoomsNavbar from "../../../Components/Rooms/RoomsNavbar";
import RoomsFooter from "../../../Components/Rooms/RoomsFooter";

const RoomsGallery = () => {
  return (
    <div>
      <RoomsNavbar />
      <div className="rooms-gallery">
        <h2>Rooms Gallery</h2>
        <p>Photos of our homestay rooms will be shown here.</p>
      </div>
      <RoomsFooter/>
    </div>
  );
};

export default RoomsGallery;
