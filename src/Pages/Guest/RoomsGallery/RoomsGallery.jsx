import React, { useEffect, useState } from "react";
import Footer from "../../../Components/Footer/Footer";
import "./RoomsGallery.css";
import RoomsNavbar from "../../../Components/RoomsNavbar/RoomsNavbar";

export default function RoomsGallery() {
  const [gallery, setGallery] = useState([]);
  const [error, setError] = useState("");

  const STORAGE_BASE_URL =
    "https://storage.googleapis.com/contra-cloud.firebasestorage.app/";

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

  const handleImgError = (e) => {
    e.target.onerror = null;
    e.target.src = "/fallback-image.png";
  };

  const homestayGallery = gallery.filter((item) => item.type === "homestay");

  const getImageUrl = (link) => {
    const trimmed = link.trim();
    const res = trimmed.split("https");
    console.log("Processed image link:", res);
    return "https" + res[2];
  };

  return (
    <>
      <RoomsNavbar />

      <div className="gallery-container">
        {error && <p className="error-message">{error}</p>}

        <div className="gallery-grid">
          {homestayGallery.length > 0 ? (
            homestayGallery.map((item) => (
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
            <p className="no-data">No homestay images yet.</p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
