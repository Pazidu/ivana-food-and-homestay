import React, { useEffect, useState } from "react";
import AdminNavbar from "../../../Components/AdminNavbar/AdminNavbar";
import Footer from "../../../Components/Footer/Footer";
import axios from "axios";
import "./Bookings.css";

function BookingsList() {
  const [bookings, setBookings] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowConfirm(true); // open modal
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${deleteId}`);
      setBookings(bookings.filter((b) => b.id !== deleteId));
    } catch (err) {
      console.error("Error deleting booking:", err);
    } finally {
      setShowConfirm(false);
      setDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setDeleteId(null);
  };

  return (
    <div className="bookings">
      <h2 className="bookings__title">All Bookings</h2>

      <table className="bookings__table">
        <thead>
          <tr>
            <th>No</th>
            <th>Guest Name</th>
            <th>Phone</th>
            <th>Room Type</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Booked At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((b, index) => (
              <tr key={b.id}>
                <td>{index + 1}</td>
                <td>{b.guestName}</td>
                <td>{b.guestPhone}</td>
                <td>{b.room_type}</td>
                <td>{new Date(b.checkIn).toLocaleDateString()}</td>
                <td>{new Date(b.checkOut).toLocaleDateString()}</td>
                <td>{new Date(b.created_at).toLocaleString()}</td>
                <td className="bookings__actions">
                  <button
                    className="btn btn--delete"
                    onClick={() => handleDeleteClick(b.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="bookings__empty">
                No bookings found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Are you sure you want to delete this booking?</p>
            <div className="modal-buttons">
              <button className="btn btn--confirm" onClick={confirmDelete}>
                Yes
              </button>
              <button className="btn btn--cancel" onClick={cancelDelete}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Bookings() {
  return (
    <>
      <AdminNavbar name="Admin" />
      <BookingsList />
      <Footer />
    </>
  );
}
export default Bookings;
