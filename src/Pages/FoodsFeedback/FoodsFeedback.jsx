import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

function FoodsFeedback() {
  return (
    <>
      <Navbar />
      <div
        style={{
          margin: "10vh 0",
          background: "#f8f9fa",
          padding: "10px 0",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <nav style={{ display: "flex", justifyContent: "center", gap: "40px" }}>
          <a
            href="#reviews"
            style={{
              textDecoration: "none",
              color: "#333",
              fontWeight: "500",
              padding: "8px 16px",
              borderRadius: "4px",
              transition: "background 0.2s",
            }}
          >
            Reviews
          </a>
          <a
            href="#complains"
            style={{
              textDecoration: "none",
              color: "#333",
              fontWeight: "500",
              padding: "8px 16px",
              borderRadius: "4px",
              transition: "background 0.2s",
            }}
          >
            Complains
          </a>
        </nav>
      </div>

      <Footer />
    </>
  );
}

export default FoodsFeedback;
