// import React from "react";
// import { useNavigate } from "react-router-dom";

import { useNavigate } from "react-router-dom";

// function Landing() {
//   return <div>Landing</div>;
// }

// export default Landing;
function Landing() {
  const navigate = useNavigate();

  const handleFoodClick = () => {
    navigate("/foods/home");
  };
  const handleRoomsClick = () => {
    navigate("/RoomsHome");
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          flex: 1,
          background: "#ffe5b4",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: "2rem",
          fontWeight: "bold",
        }}
        onClick={handleFoodClick}
      >
        Ivana Foods
      </div>
      <div
        style={{
          flex: 1,
          background: "#b4d8ff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: "2rem",
          fontWeight: "bold",
        }}
        onClick={handleRoomsClick}
      >
        Ivana Homestray
      </div>
    </div>
  );
}

export default Landing;
