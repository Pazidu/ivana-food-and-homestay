import React, { useEffect, useState } from "react";
import AdminNavbar from "../../../Components/AdminNavbar/AdminNavbar";
import Footer from "../../../Components/Footer/Footer";
import "./Gallery.css";

export default function AdminGallery() {
  const [activeTab, setActiveTab] = useState("foods");
  const [foodsGallery, setFoodsGallery] = useState([]);
  const [homestayGallery, setHomestayGallery] = useState([]);
  const [zoomImage, setZoomImage] = useState(null);

  // Fetch gallery data
  const fetchGallery = async () => {
    try {
      const resPending = await fetch(
        `http://localhost:5000/api/gallery/pending`
      );
      const pendingData = await resPending.json();

      const resApproved = await fetch(
        `http://localhost:5000/api/gallery/approved`
      );
      const approvedData = await resApproved.json();

      // Filter by type from both pending and approved
      const foods = [...pendingData, ...approvedData].filter(
        (item) => item.type === "foods"
      );
      const homestay = [...pendingData, ...approvedData].filter(
        (item) => item.type === "homestay"
      );

      setFoodsGallery(foods);
      setHomestayGallery(homestay);
    } catch (err) {
      console.error("Error fetching gallery:", err);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // Approve an image
  const handleApprove = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/gallery/${id}/approve`, {
        method: "PUT",
      });
      fetchGallery();
    } catch (err) {
      console.error("Approve error:", err);
    }
  };

  // Reject an image
  const handleReject = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/gallery/${id}/reject`, {
        method: "PUT",
      });
      fetchGallery();
    } catch (err) {
      console.error("Reject error:", err);
    }
  };

  // Delete an image
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/gallery/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (res.ok) {
        alert(result.message);
        fetchGallery();
      } else {
        alert(result.error || "Delete failed");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete image");
    }
  };

  // Render table for a gallery type
  const renderTable = (gallery) => (
    <table className="admin-gallery-table">
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Image</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {gallery.length > 0 ? (
          gallery.map((item, idx) => (
            <tr key={item.id}>
              <td>{idx + 1}</td>
              <td>{item.name}</td>
              <td>{item.phone}</td>
              <td>
                <img
                  src={item.image_link}
                  alt={item.name}
                  style={{
                    width: "100px",
                    height: "60px",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() => setZoomImage(item.image_link)}
                />
              </td>
              <td>{item.status}</td>
              <td>
                {item.status === "pending" ? (
                  <>
                    <button
                      className="approve-btn"
                      onClick={() => handleApprove(item.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => handleReject(item.id)}
                    >
                      Reject
                    </button>
                  </>
                ) : item.status === "approved" ? (
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                ) : (
                  <span style={{ color: "red" }}>Rejected</span>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" style={{ textAlign: "center" }}>
              No images found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );

  return (
    <>
      <AdminNavbar name="Admin" />
      <div className="admin-gallery-container">
        <div className="admin-gallery-tabs">
          <button
            className={activeTab === "foods" ? "active" : ""}
            onClick={() => setActiveTab("foods")}
          >
            Foods Images ({foodsGallery.length})
          </button>
          <button
            className={activeTab === "homestay" ? "active" : ""}
            onClick={() => setActiveTab("homestay")}
          >
            Homestay Images ({homestayGallery.length})
          </button>
        </div>

        <div className="admin-gallery-section">
          {activeTab === "foods"
            ? renderTable(foodsGallery)
            : renderTable(homestayGallery)}
        </div>
      </div>

      {/* Zoom Modal */}
      {zoomImage && (
        <div className="zoom-modal" onClick={() => setZoomImage(null)}>
          <img src={zoomImage} alt="Zoom" className="zoom-image" />
        </div>
      )}

      <Footer />
    </>
  );
}
