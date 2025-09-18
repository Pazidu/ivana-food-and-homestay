import React, { useEffect, useState } from "react";
import AdminNavbar from "../../../Components/AdminNavbar/AdminNavbar";
import Footer from "../../../Components/Footer/Footer";
import axios from "axios";
import "./Bookings.css";

function BookingsList() {
  const [bookings, setBookings] = useState([]);

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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?"))
      return;

    try {
      await axios.delete(`http://localhost:5000/api/bookings/${id}`);
      setBookings(bookings.filter((b) => b.id !== id));
    } catch (err) {
      console.error("Error deleting booking:", err);
    }
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
                    onClick={() => handleDelete(b.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="bookings__empty">
                No bookings found
              </td>
            </tr>
          )}
        </tbody>
      </table>
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
