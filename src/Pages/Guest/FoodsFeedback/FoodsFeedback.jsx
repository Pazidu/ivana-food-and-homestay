import React, { useState, useEffect } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import "./FoodsFeedback.css";

export default function FoodsFeedback() {
  const [activeTab, setActiveTab] = useState("reviews");
  const [reviews, setReviews] = useState([]);
  const [complaints, setComplaints] = useState([]);

  // Generic fetch function
  const fetchData = async (endpoint, setter) => {
    try {
      const res = await fetch(`http://localhost:5000/api/foods/${endpoint}`);
      const data = await res.json();
      setter(data);
    } catch (err) {
      console.error(`Error fetching ${endpoint}:`, err);
    }
  };

  // Handle form submit
  const handleSubmit = async (e, endpoint, body, callback) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/foods/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error(`Failed to submit ${endpoint}:`, data.message);
      } else {
        e.target.reset();
        callback();
      }
    } catch (err) {
      console.error(`Error posting ${endpoint}:`, err);
    }
  };

  // Fetch data on tab change
  useEffect(() => {
    activeTab === "reviews"
      ? fetchData("reviews", setReviews)
      : fetchData("complaints", setComplaints);
  }, [activeTab]);

  return (
    <>
      <Navbar name="Log In" />
      <div className="feedback-container">
        {/* Sub Navbar */}
        <div className="subnavbar">
          {["reviews", "complaints"].map((tab) => (
            <button
              key={tab}
              className={`subnav-btn ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div className="content-section">
          {activeTab === "reviews" ? (
            <div className="reviews-section">
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
                <p className="no-data"></p>
              ) : (
                complaints.map((c) => (
                  <div key={c.id} className="card">
                    <p className="card-user">{c.name}</p>
                    <p className="card-text">{c.comment}</p>
                  </div>
                ))
              )}
              {/* Complaint Form */}
              <form
                className="feedback-form"
                onSubmit={async (e) => {
                  await handleSubmit(
                    e,
                    "complaints",
                    {
                      name: e.target.name.value,
                      comment: e.target.comment.value,
                    },
                    () => fetchData("complaints", setComplaints)
                  );
                  // Show success alert
                  alert("Complaint submitted successfully!");
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
                  placeholder="Your Complaint"
                  required
                  className="form-textarea"
                />
                <button type="submit" className="form-submit-btn">
                  Submit Complaint
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Review Form */}
        {activeTab === "reviews" && (
          <div className="feedback-form-section">
            <h3 className="feedback-form-title">Submit a Review</h3>
            <form
              className="feedback-form"
              onSubmit={(e) => {
                handleSubmit(
                  e,
                  "reviews",
                  {
                    name: e.target.name.value,
                    comment: e.target.comment.value,
                    rating: e.target.rating.value,
                  },
                  () => fetchData("reviews", setReviews)
                );
                //add success message
                alert("Review submitted successfully!");
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
