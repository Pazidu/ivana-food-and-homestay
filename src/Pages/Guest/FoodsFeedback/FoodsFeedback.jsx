import React, { useState, useEffect } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import "./FoodsFeedback.css";

export default function FoodsFeedback() {
  const [activeTab, setActiveTab] = useState("reviews");
  const [reviews, setReviews] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState(""); // Added error state

  // Generic fetch function with error handling
  const fetchData = async (endpoint, setter) => {
    try {
      const res = await fetch(`http://localhost:5000/api/foods/${endpoint}`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setter(data);
        setError(""); // clear previous errors
      } else {
        console.error(`Expected array but got:`, data);
        setter([]);
        setError(data.message || `Unexpected response from ${endpoint}`);
      }
    } catch (err) {
      console.error(`Error fetching ${endpoint}:`, err);
      setter([]);
      setError(`Failed to fetch ${endpoint}`);
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
        alert(data.message || `Failed to submit ${endpoint}`);
      } else {
        e.target.reset();
        callback();
        alert(
          `${
            endpoint.charAt(0).toUpperCase() + endpoint.slice(1)
          } submitted successfully!`
        );
      }
    } catch (err) {
      console.error(`Error posting ${endpoint}:`, err);
      alert(`Error posting ${endpoint}`);
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

        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}

        {/* Content Section */}
        <div className="content-section">
          {activeTab === "reviews" ? (
            <div className="reviews-section">
              {reviews.length > 0 ? (
                reviews.map((r) => (
                  <div key={r.id} className="card">
                    <p className="card-user">{r.name}</p>
                    <p className="card-text">{r.comment}</p>
                    <p className="card-rating">⭐ {r.rating}/5</p>
                  </div>
                ))
              ) : (
                <p className="no-data">No reviews yet.</p>
              )}
            </div>
          ) : (
            <div className="complaints-section">
              <h2 className="section-title">Customer Complaints</h2>
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
      <Footer />
    </>
  );
}
