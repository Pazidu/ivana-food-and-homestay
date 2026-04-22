import React, { useEffect, useState } from "react";
import AdminNavbar from "../../../Components/AdminNavbar/AdminNavbar";
import Footer from "../../../Components/Footer/Footer";
import "./Gallery.css";

export default function AdminGallery() {
  const [activeTab, setActiveTab] = useState("foods");
  const [foodsGallery, setFoodsGallery] = useState([]);
  const [homestayGallery, setHomestayGallery] = useState([]);
  const [zoomImage, setZoomImage] = useState(null);

  const fetchGallery = async () => {
    try {
      const resPending = await fetch(
        "http://localhost:5000/api/gallery/pending"
      );
      const pendingData = await resPending.json();

      const resApproved = await fetch(
        "http://localhost:5000/api/gallery/approved"
      );
      const approvedData = await resApproved.json();

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

  const getImageUrl = (link) => {
    if (!link) return "";

    const trimmed = link.trim();
    const res = trimmed.split("https");

    if (res.length < 3) return trimmed;

    return "https" + res[2];
  };

  const renderTable = (gallery) => (
    <table className="admin-gallery-table">
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {gallery.length > 0 ? (
          gallery.map((item, idx) => (
            <tr key={item.id}>
              <td>{idx + 1}</td>
              <td>{item.name}</td>
              <td>
                <img
                  src={getImageUrl(item.image_link)}
                  alt={item.name}
                  style={{
                    width: "100px",
                    height: "60px",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() => setZoomImage(getImageUrl(item.image_link))}
                />
              </td>
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
        <div className="admin-upload-box">
          <h3>Upload New Image</h3>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target);

              const res = await fetch(
                "http://localhost:5000/api/gallery/admin/add",
                {
                  method: "POST",
                  body: formData,
                }
              );

              const data = await res.json();

              if (res.ok) {
                alert("Image Uploaded Successfully!");
                fetchGallery();
                e.target.reset();
              } else {
                alert(data.error);
              }
            }}
          >
            <select name="type" required>
              <option value="">Select Type</option>
              <option value="foods">Foods</option>
              <option value="homestay">Homestay</option>
            </select>

            <input type="file" name="image" accept="image/*" required />

            <button type="submit" className="upload-btn">
              Upload
            </button>
          </form>
        </div>

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

      {zoomImage && (
        <div className="zoom-modal" onClick={() => setZoomImage(null)}>
          <img src={zoomImage} alt="Zoom" className="zoom-image" />
        </div>
      )}

      <Footer />
    </>
  );
}
