// src/Pages/Admin/Reviews/Reviews.jsx
import React, { useEffect, useState } from "react";
import AdminNavbar from "../../../Components/AdminNavbar/AdminNavbar";
import axios from "axios";
import Footer from "../../../Components/Footer/Footer";
import "./Reviews.css"; // create a CSS file similar to Menu.css

function ReviewsList() {
  const [reviews, setReviews] = useState([]);

  // Fetch all reviews
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/foods/reviews")
      .then((res) => setReviews(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Delete a review
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/foods/reviews/${id}`);
      setReviews(reviews.filter((review) => review.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="reviews">
      <h2 className="reviews__title">User Reviews</h2>

      <table className="reviews__table">
        <thead>
          <tr>
            <th>No</th>
            <th>User</th>
            <th>Review</th>
            <th>Rating</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, index) => (
            <tr key={review.id}>
              <td>{index + 1}</td>
              <td>{review.name}</td>
              <td>{review.comment}</td>
              <td>{review.rating}/5</td>
              <td>{new Date(review.created_at).toLocaleDateString()}</td>
              <td className="reviews__actions">
                <button
                  className="btn btn--delete"
                  onClick={() => handleDelete(review.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Reviews() {
  return (
    <>
      <AdminNavbar name="Admin" />
      <ReviewsList />
      <Footer />
    </>
  );
}

export default Reviews;
