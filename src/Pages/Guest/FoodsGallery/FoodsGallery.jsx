import React, { useEffect, useState } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import "./FoodsGallery.css";

export default function FoodsGallery() {
  const [gallery, setGallery] = useState([]);
  const [error, setError] = useState("");

  const STORAGE_BASE_URL =
    "https://storage.googleapis.com/contra-cloud.firebasestorage.app/";

  // Fetch approved images
  const fetchGallery = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/gallery/approved");
      const data = await res.json();

      console.log("Fetched gallery data:", data);

      if (Array.isArray(data)) {
        setGallery(data);
        setError("");
      } else {
        setGallery([]);
        setError(data.message || "Unexpected response from server");
      }
    } catch (err) {
      console.error("Error fetching gallery:", err);
      setError("Failed to fetch gallery");
      setGallery([]);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // Image error fallback handler
  const handleImgError = (e) => {
    e.target.onerror = null; // Prevent infinite loop if fallback image fails
    e.target.src = "/fallback-image.png"; // Use a local fallback image or a reliable URL
  };

  // Filter gallery to show only type "foods"
  const foodsGallery = gallery.filter((item) => item.type === "foods");

  // Build full valid URL for image
  const getImageUrl = (link) => {
    const trimmed = link.trim();
    const res = trimmed.split("https");
    console.log("Processed image link:", res);
    return "https" + res[2];
  };

  return (
    <>
      <Navbar name="Log In" />

      <div className="gallery-container">
        {error && <p className="error-message">{error}</p>}

        <div className="gallery-grid">
          {foodsGallery.length > 0 ? (
            foodsGallery.map((item) => (
              <div key={item.id} className="gallery-card">
                <img
                  src={getImageUrl(item.image_link)}
                  alt={item.name || "Gallery Image"}
                  className="gallery-img"
                />
                {/* <p className="gallery-text">{item.name || "No Name"}</p> */}
              </div>
            ))
          ) : (
            <p className="no-data">No food images yet.</p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
