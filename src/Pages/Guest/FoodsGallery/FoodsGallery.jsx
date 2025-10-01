import React, { useEffect, useState } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import "./FoodsGallery.css";

export default function FoodsGallery() {
  const [gallery, setGallery] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  // ✅ Fetch only approved images
  const fetchGallery = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/gallery/approved");
      const data = await res.json();

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
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // ✅ Handle image upload
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const res = await fetch("http://localhost:5000/api/gallery/add", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) {
        alert(result.error || "Upload failed");
      } else {
        alert(
          "Image uploaded successfully! Admin will review it before showing."
        );
        e.target.reset();
        fetchGallery();
        setShowModal(false);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Something went wrong while uploading.");
    }
  };

  return (
    <>
      <Navbar name="Log In" />

      <div className="gallery-container">
        {/* Add button */}
        <button className="add-btn" onClick={() => setShowModal(true)}>
          + Add Yours
        </button>

        {/* Error message */}
        {error && <p className="error-message">{error}</p>}

        {/* Gallery grid */}
        <div className="gallery-grid">
          {gallery.length > 0 ? (
            gallery.map((item) => (
              <div key={item.id} className="gallery-card">
                <img
                  src={item.image_link}
                  alt={item.name}
                  className="gallery-img"
                />
                <p className="gallery-text">{item.name}</p>
              </div>
            ))
          ) : (
            <p className="no-data">No images yet.</p>
          )}
        </div>

        {/* Modal form */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Add New Image</h2>
              <form className="upload-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  required
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter Phone"
                  required
                />
                <input type="file" name="image" accept="image/*" required />
                <input type="hidden" name="type" value="foods" />
                <div className="modal-buttons">
                  <button type="submit">Upload</button>
                  <button type="button" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
