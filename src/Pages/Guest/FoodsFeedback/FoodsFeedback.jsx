import React, { useState, useEffect } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import "./FoodsFeedback.css";

export default function FoodsFeedback() {
  const [activeTab, setActiveTab] = useState("reviews"); // default tab
  const [reviews, setReviews] = useState([]);
  const [complaints, setComplaints] = useState([]);

  // Fetch reviews
  const fetchReviews = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/foods/reviews");
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  // Fetch complaints
  const fetchComplaints = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/foods/complaints");
      const data = await res.json();
      setComplaints(data);
    } catch (err) {
      console.error("Error fetching complaints:", err);
    }
  };

  // Fetch data on tab change
  useEffect(() => {
    if (activeTab === "reviews") fetchReviews();
    else fetchComplaints();
  }, [activeTab]);

  return (
    <>
      <Navbar name="Log In" />
      <div className="feedback-container">
        {/* Sub Navbar */}
        <div className="subnavbar">
          <button
            className={`subnav-btn ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews
          </button>
          <button
            className={`subnav-btn ${
              activeTab === "complaints" ? "active" : ""
            }`}
            onClick={() => setActiveTab("complaints")}
          >
            Complaints
          </button>
        </div>
            
        {/* Content Section */}
        <div className="content-section">
          {activeTab === "reviews" ? (
            <div className="reviews-section">
              <h2 className="section-title">Customer Reviews</h2>
              {reviews.length === 0 ? (
                <p className="no-data">No reviews yet.</p>
              ) : (
                reviews.map((r) => (
                  <div key={r.id} className="card">
                    <p className="card-user">{r.name}</p>
                    <p className="card-text">{r.comment}</p>
                    <p className="card-rating">⭐ {r.rating}/5</p>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="complaints-section">
              <h2 className="section-title">Customer Complaints</h2>
              {complaints.length === 0 ? (
                <p className="no-data">No complaints yet.</p>
              ) : (
                complaints.map((c) => (
                  <div key={c.id} className="card complaint-card">
                    <p className="card-user">{c.user}</p>
                    <p className="card-text">{c.issue}</p>
                    <p className="card-date">📅 {c.date}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Feedback Form */}
        {activeTab === "reviews" && (
          <div className="feedback-form-section">
            <h3 className="feedback-form-title">Submit a Review</h3>
            <form
              className="feedback-form"
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const review = {
                  name: formData.get("name"),
                  comment: formData.get("comment"),
                  rating: formData.get("rating"),
                };
                try {
                  const res = await fetch(
                    "http://localhost:5000/api/foods/reviews",
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(review),
                    }
                  );
                  const data = await res.json();
                  if (!res.ok) {
                    console.error("Failed to submit review:", data.message);
                  } else {
                    e.target.reset();
                    fetchReviews();
                  }
                } catch (err) {
                  console.error("Error posting review:", err);
                }
              }}
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="form-input"
              />
              <textarea
                name="comment"
                placeholder="Your Review"
                required
                className="form-textarea"
              />
              <select name="rating" required className="form-select">
                <option value="">Rating</option>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              <button type="submit" className="form-submit-btn">
                Submit Review
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
