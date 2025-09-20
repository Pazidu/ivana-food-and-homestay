// src/Pages/Admin/Reviews/Complaints.jsx
import React, { useEffect, useState } from "react";
import AdminNavbar from "../../../Components/AdminNavbar/AdminNavbar";
import axios from "axios";
import Footer from "../../../Components/Footer/Footer";
import "./Complaints.css";

function ComplaintsList() {
  const [complaints, setComplaints] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // Fetch complaints
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/foods/complaints")
      .then((res) => setComplaints(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Delete complaint
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/foods/complaints/${id}`);
      setComplaints(complaints.filter((complaint) => complaint.id !== id));
      setShowModal(false);
      setConfirmDeleteId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setConfirmDeleteId(null);
  };

  return (
    <div className="complaints">
      <h2 className="complaints__title">User Complaints</h2>

      {/* ===== Delete Warning Modal ===== */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Are you sure you want to delete this complaint?</p>
            <div className="modal-buttons">
              <button
                className="btn--confirm"
                onClick={() => handleDelete(confirmDeleteId)}
              >
                Yes
              </button>
              <button className="btn--cancel" onClick={handleCloseModal}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <table className="complaints__table">
        <thead className="complaints__thead">
          <tr>
            <th className="complaints__th">No</th>
            <th className="complaints__th">User</th>
            <th className="complaints__th">Complaint</th>
            <th className="complaints__th">Date</th>
            <th className="complaints__th">Actions</th>
          </tr>
        </thead>
        <tbody className="complaints__tbody">
          {complaints.map((complaint, index) => (
            <tr key={complaint.id} className="complaints__row">
              <td className="complaints__cell">{index + 1}</td>
              <td className="complaints__cell">{complaint.name}</td>
              <td className="complaints__cell">{complaint.comment}</td>
              <td className="complaints__cell">
                {new Date(complaint.date).toLocaleDateString()}
              </td>
              <td className="complaints__actions">
                <button
                  className="btn btn--delete"
                  onClick={() => {
                    setConfirmDeleteId(complaint.id);
                    setShowModal(true);
                  }}
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

function Complaints() {
  return (
    <>
      <AdminNavbar name="Admin" />
      <ComplaintsList />
      <Footer />
    </>
  );
}

export default Complaints;
